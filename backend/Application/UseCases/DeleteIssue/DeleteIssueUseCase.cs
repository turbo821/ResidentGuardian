
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
namespace Application.UseCases.DeleteIssue
{
    public class DeleteIssueUseCase : IDeleteIssueUseCase
    {
        private readonly IIssueRepository _issueRepo;
        private readonly UserManager<User> _userManager;
        private readonly IFileStorage _fileStorage;
        private readonly ICacheService _cache;
        private const string AllIssuesKey = "AllIssues";

        public DeleteIssueUseCase(IIssueRepository issueRepo, UserManager<User> userManager, IFileStorage fileStorage, ICacheService cache)
        {
            _issueRepo = issueRepo;
            _userManager = userManager;
            _fileStorage = fileStorage;
            _cache = cache;
        }

        public async Task<bool> Execute(Guid id, DeleteIssueRequest request)
        {
            var currentUser = await _userManager.FindByIdAsync(request.UserId.ToString());
            if (currentUser == null) return false;

            var issue = await _issueRepo.GetById(id);
            if (issue == null) return false;

            string cacheKey = $"Issue_{id}";
            await _cache.RemoveAsync(cacheKey);
            await _cache.RemoveByPatternAsync(AllIssuesKey);

            if (request.SoftDeletion)
            {
                return await SoftDelete(issue, currentUser);
            }
            else
            {
                return await HardDelete(issue, currentUser);
            }
        }

        private async Task<bool> SoftDelete(Issue issue, User currentUser)
        {
            bool isCurrentModerator = await _userManager.IsInRoleAsync(currentUser, "Moderator") 
                && await _issueRepo.CheckModeratorToIssueAccess(currentUser.Id, issue.Id);

            if (isCurrentModerator
                || await _userManager.IsInRoleAsync(currentUser, "Admin")
                || issue.UserId == currentUser.Id)
            {
                issue.RevokedOn = DateTime.UtcNow;
                issue.RevokedById = currentUser.Id;

                var success = await _issueRepo.Update(issue);
                return success;
            }
            return false;
        }

        private async Task<bool> HardDelete(Issue issue, User currentUser)
        {
            if (await _userManager.IsInRoleAsync(currentUser, "Admin"))
            {
                foreach (var image in issue.Images) 
                {
                    _fileStorage.DeleteImage(image.Uri);
                }

                var success = await _issueRepo.Delete(issue);
                return success;
            }
            return false;
        }
    }
}
