using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.UseCases.GetAllIssues
{
    public class GetAllIssueUseCase : IGetAllIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly ICacheService _cache;

        public GetAllIssueUseCase(IIssueRepository repo, ICacheService cache)
        {
            _repo = repo;
            _cache = cache;
        }
        public async Task<PaginatedResult<GetAllIssueResponse>?> Execute(IssueFilterRequest request, Guid? userId, bool isRevoredIssues = false)
        {
            (var issues, int totalCount) = await _repo.GetAll(request, isRevoredIssues);
            if(!issues.Any())
                return null;

            var issuesDtos = issues.Select(issue =>
            new GetAllIssueResponse(
                issue.Id,
                issue.Title,
                issue.Category.Title,
                issue.Status,
                issue.Images?.Select(img => img.Uri).FirstOrDefault()!,
                Coords: issue.Point != null 
                    ? new List<double>() { issue.Point.Y, issue.Point.X } 
                    : new List<double>(), 
                Like: userId != null ? issue.Grades.FirstOrDefault(g => g.UserId == userId)?.Like : null,
                LikeCount: issue.Grades.Where(g => g.Like).Count(), DislikeCount: issue.Grades.Where(g => !g.Like).Count()
            ));

            var response = new PaginatedResult<GetAllIssueResponse>(issuesDtos, totalCount, request.PageSize ?? 1);
            return response;
        }
    }
}
