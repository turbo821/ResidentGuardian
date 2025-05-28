
using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Interfaces;
using Domain.Models;

namespace Application.UseCases.GetAllRevoredIssue
{
    public class GetAllRevoredIssueUseCase : IGetAllRevoredIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(15);

        public GetAllRevoredIssueUseCase(IIssueRepository repo, ICacheService cache)
        {
            _repo = repo;
            _cache = cache;
        }

        public async Task<PaginatedResult<GetAllRevoredIssueResponse>?> Execute(IssueFilterRequest request, Guid? userId)
        {
            string cacheKey = $"AllIssues_{request.GetCacheKey()};isRevored=true";
            var cachedResponse = await _cache.GetAsync<PaginatedResult<GetAllRevoredIssueResponse>?>(cacheKey);
            if (cachedResponse != null)
            {
                return cachedResponse;
            }

            (var issues, int totalCount) = await _repo.GetAll(request, true);
            if (!issues.Any())
                return null;

            var issuesDtos = issues.Select(issue =>
            new GetAllRevoredIssueResponse(
                issue.Id,
                issue.Title,
                issue.Category.Title,
                issue.Status,
                issue.RevokedById == issue.UserId,
                issue.RevokedOn!.Value,
                issue.Images.Select(img => img.Uri).FirstOrDefault()!,
                Like: userId != null ? issue.Grades.FirstOrDefault(g => g.UserId == userId)?.Like : null,
                LikeCount: issue.Grades.Where(g => g.Like).Count(), DislikeCount: issue.Grades.Where(g => !g.Like).Count()
            ));

            var response = new PaginatedResult<GetAllRevoredIssueResponse>(issuesDtos, totalCount, request.PageSize ?? 1);
            await _cache.SetAsync(cacheKey, response, _cacheExpiration);

            return response;
        }
    }
}
