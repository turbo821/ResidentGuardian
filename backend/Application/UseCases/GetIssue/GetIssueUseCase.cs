
using Application.Services.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases.GetIssue
{
    public class GetIssueUseCase : IGetIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);

        public GetIssueUseCase(IIssueRepository repo, ICacheService cache)
        {
            _repo = repo;
            _cache = cache;
        }
        public async Task<GetIssueResponse?> Execute(Guid id, Guid? userId)
        {
            string cacheKey = $"Issue_{id}";
            var cachedResult = await _cache.GetAsync<GetIssueResponse>(cacheKey);

            if (cachedResult != null)
            {
                return cachedResult;
            }

            var issue = await _repo.GetById(id);
            if (issue is null) return null;

            var like = userId != null ? issue.Grades.FirstOrDefault(g => g.UserId == userId)?.Like : null;

            var issueDto = new GetIssueResponse(issue.Id,
                issue.Title, issue.Status, issue.Description, issue.Category.Title, issue.CategoryId,
                issue.Location, Coords: issue.Point != null ? new List<double>() { issue.Point.Y, issue.Point.X }
                    : new List<double>(), issue.Images.Select(im => im.Uri).ToList(), issue.UserId,
                issue.CreatedAt, issue.ModifiedOn,
                like, issue.Grades.Where(g => g.Like).Count(), issue.Grades.Where(g => !g.Like).Count());
            await _cache.SetAsync(cacheKey, issueDto, _cacheExpiration);

            return issueDto;
        }
    }
}
