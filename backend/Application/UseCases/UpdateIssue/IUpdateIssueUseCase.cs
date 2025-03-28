namespace Application.UseCases.UpdateIssue
{
    public interface IUpdateIssueUseCase
    {
        Task<bool> Execute(UpdateIssueRequest issueDto);
    }
}
