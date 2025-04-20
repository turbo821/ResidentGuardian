using Application.Dtos;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using NetTopologySuite.Geometries;

namespace Application.UseCases.CreateIssue
{
    public class CreateIssueUseCase : ICreateIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFileStorage _fileStorage;

        public CreateIssueUseCase(IIssueRepository repo, IMapper mapper, IFileStorage fileStorage)
        {
            _repo = repo;
            _mapper = mapper;
            _fileStorage = fileStorage;
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

            var id = await _repo.Add(issue);
            if (id is not null)
                return id;

            return null;
        }
    }
}
