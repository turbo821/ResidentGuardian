
using Application.Services.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases.RestoreIssue
{
    public class RestoreIssueUseCase : IRestoreIssueUseCase
    {
        private readonly IIssueRepository _issueRepo;
        private readonly ICacheService _cache;
        private const string AllIssuesCacheKey = "AllIssues";

        public RestoreIssueUseCase(IIssueRepository issueRepo, ICacheService cache)
        {
            _issueRepo = issueRepo;
            _cache = cache;
        }

        public async Task<bool> Execute(Guid id)
        {
            var issue = await _issueRepo.GetById(id);
            if (issue == null) return false;

            issue.RevokedOn = null;
            issue.RevokedById = null;

            var success = await _issueRepo.Update(issue);

            await _cache.RemoveByPatternAsync(AllIssuesCacheKey);

            return success;
        }
    }
}
