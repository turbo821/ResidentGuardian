﻿using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using NetTopologySuite.Geometries;

namespace Application.UseCases.CreateIssue
{
    public class CreateIssueUseCase : ICreateIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IFileStorageService _fileStorage;
        private readonly ICacheService _cache;
        private const string AllIssuesKey = "AllIssues";

        public CreateIssueUseCase(IIssueRepository repo, IFileStorageService fileStorage, ICacheService cache)
        {
            _repo = repo;
            _fileStorage = fileStorage;
            _cache = cache;
        }
        public async Task<Guid?> Execute(CreateIssueRequest issueDto, Guid userId)
        {
            List<IssueImage> imageUris = new List<IssueImage>();
            foreach (var image in issueDto.Images)
            {
                var uri = await _fileStorage.SaveImageAsync(image);

                var issueImage = new IssueImage
                {
                    Uri = uri
                };
                imageUris.Add(issueImage);
            }

            if (!double.TryParse(issueDto.PointLatitude, out var latitude)
                || !double.TryParse(issueDto.PointLongitude, out var longitude))
                return null;

            var point = new Point(longitude, latitude) { SRID = 4326 };

            var issue = new Issue
            {
                Title = issueDto.Title,
                Description = issueDto.Description,
                Location = issueDto.Location,
                Point = point,
                UserId = userId,
                CategoryId = issueDto.CategoryId,
                Images = imageUris
            };

            await _cache.RemoveByPatternAsync(AllIssuesKey);

            var id = await _repo.Add(issue);
            if (id is not null)
                return id;

            return null;
        }
    }
}
