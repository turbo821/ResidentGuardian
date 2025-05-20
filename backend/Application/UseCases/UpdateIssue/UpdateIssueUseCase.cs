using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using NetTopologySuite.Geometries;

namespace Application.UseCases.UpdateIssue
{
    public class UpdateIssueUseCase : IUpdateIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IFileStorage _fileStorage;

        public UpdateIssueUseCase(IIssueRepository repo, IFileStorage fileStorage)
        {
            _repo = repo;
            _fileStorage = fileStorage;
        }

        public async Task<bool> Execute(Guid issueId, UpdateIssueRequest issueDto, Guid userId)
        {
            var issue = await _repo.GetById(issueId);

            if (issue is null) return false;
            if (issue.UserId != userId) return false;

            issue.Title = issueDto.Title;
            issue.Description = issueDto.Description;
            issue.CategoryId = issueDto.CategoryId;

            foreach (var image in issue.Images)
            {
                if (!issueDto.imagesToKeep.Contains(image.Uri))
                {
                    _fileStorage.DeleteImage(image.Uri);
                }
            }
            issue.Images = issue.Images.Where(image => issueDto.imagesToKeep.Contains(image.Uri)).ToList();

            List<IssueImage> imageUris = new List<IssueImage>();
            if (issueDto.Images != null)
            {
                foreach (var image in issueDto.Images)
                {
                    var uri = await _fileStorage.SaveImageAsync(image);

                    var issueImage = new IssueImage
                    {
                        Uri = uri
                    };
                    imageUris.Add(issueImage);
                }
                issue.Images.AddRange(imageUris);
            }

            if (!double.TryParse(issueDto.PointLatitude, out var latitude)
                || !double.TryParse(issueDto.PointLongitude, out var longitude))
                return false;

            var point = new Point(longitude, latitude) { SRID = 4326 };

            issue.Location = issueDto.Location;
            issue.Point = point;

            var success = await _repo.Update(issue);
            return success;
        }
    }
}
