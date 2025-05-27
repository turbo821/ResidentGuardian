using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using NetTopologySuite.Geometries;

namespace Application.UseCases.UpdateIssue
{
    public class UpdateIssueUseCase : IUpdateIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IFileStorageService _fileStorage;
        private readonly ICacheService _cache;
        private const string AllIssuesKey = "AllIssues";
        public UpdateIssueUseCase(IIssueRepository repo, IFileStorageService fileStorage, ICacheService cache)
        {
            _repo = repo;
            _fileStorage = fileStorage;
            _cache = cache;
        }

        public async Task<bool> Execute(Guid issueId, UpdateIssueRequest issueDto, Guid userId)
        {
            var issue = await _repo.GetById(issueId);

            if (issue is null) return false;
            if (issue.UserId != userId) return false;

            issue.Title = issueDto.Title;
            issue.Description = issueDto.Description;
            issue.CategoryId = issueDto.CategoryId;
            issue.ModifiedOn = DateTime.UtcNow;
            issue.ModifiedById = userId;

            await ProcessImages(issue, issueDto);

            if (!double.TryParse(issueDto.PointLatitude, out var latitude) ||
                !double.TryParse(issueDto.PointLongitude, out var longitude))
                return false;

            issue.Point = new Point(longitude, latitude) { SRID = 4326 };
            issue.Location = issueDto.Location;
            var success = await _repo.Update(issue);

            if (success)
            {
                string cacheKey = $"Issue_{issueId}";
                await _cache.RemoveAsync(cacheKey);
                await _cache.RemoveByPatternAsync(AllIssuesKey);
            }

            return success;
        }

        private async Task ProcessImages(Issue issue, UpdateIssueRequest issueDto)
        {
            if (issueDto.imagesToKeep != null)
            {
                var imagesToRemove = issue.Images
                    .Where(image => !issueDto.imagesToKeep.Contains(image.Uri))
                    .ToList();

                foreach (var image in imagesToRemove)
                {
                    await _fileStorage.DeleteImage(image.Uri);
                    await _repo.RemoveImage(image);
                }
            }
            else
            {
                foreach (var image in issue.Images.ToList())
                {
                    await _fileStorage.DeleteImage(image.Uri);
                    await _repo.RemoveImage(image);
                }
            }

            if (issueDto.Images != null)
            {
                foreach (var image in issueDto.Images)
                {
                    var uri = await _fileStorage.SaveImageAsync(image);
                    await _repo.AddImage(issue.Id, uri);
                }
            }
        }
    }
}
