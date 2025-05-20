namespace Application.UseCases.UpdateIssue
{
    public interface IUpdateIssueUseCase
    {
        Task<bool> Execute(Guid issueId, UpdateIssueRequest issueDto, Guid userId);
    }
}
