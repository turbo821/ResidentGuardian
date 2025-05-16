
using Domain.Interfaces;

namespace Application.UseCases.RestoreIssue
{
    public class RestoreIssueUseCase : IRestoreIssueUseCase
    {
        private readonly IIssueRepository _issueRepo;

        public RestoreIssueUseCase(IIssueRepository issueRepo)
        {
            _issueRepo = issueRepo;
        }

        public async Task<bool> Execute(Guid id)
        {
            var issue = await _issueRepo.GetById(id);
            if (issue == null) return false;

            issue.RevokedOn = null;
            issue.RevokedById = null;

            var success = await _issueRepo.Update(issue);
            return success;
        }
    }
}
