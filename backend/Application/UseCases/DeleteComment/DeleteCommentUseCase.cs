using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.DeleteComment
{
    public class DeleteCommentUseCase : IDeleteCommentUseCase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IIssueRepository _issueRepo;
        private readonly UserManager<User> _userManager;
        private readonly ICacheService _cache;

        public DeleteCommentUseCase(ICommentRepository commentRepo, IIssueRepository issueRepo, UserManager<User> userManager, ICacheService cache)
        {
            _commentRepo = commentRepo;
            _issueRepo = issueRepo;
            _userManager = userManager;
            _cache = cache;
        }
        public async Task<bool> Execute(Guid commentId, Guid userId)
        {
            var currentUser = await _userManager.FindByIdAsync(userId.ToString());
            if (currentUser == null) return false;

            var comment = await _commentRepo.GetById(commentId);
            if (comment == null) return false;

            bool isCurrentModerator = await _userManager.IsInRoleAsync(currentUser, "Moderator")
                && await _issueRepo.CheckModeratorToIssueAccess(currentUser.Id, comment.IssueId);

            bool isAdmin = await _userManager.IsInRoleAsync(currentUser, "Admin");

            if (!isAdmin && !isCurrentModerator) return false;

            string cacheKey = $"AllComments_{comment.IssueId}";
            await _cache.RemoveAsync(cacheKey);

            var success = await _commentRepo.Delete(comment);
            return success;
        }
    }
}
