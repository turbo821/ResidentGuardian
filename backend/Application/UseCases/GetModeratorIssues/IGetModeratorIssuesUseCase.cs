using Application.UseCases.GetUserIssues;

namespace Application.UseCases.GetModeratorIssues
{
    public interface IGetModeratorIssuesUseCase
    {
        Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid moderatorId);
    }
}