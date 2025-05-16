namespace Application.UseCases.DeleteIssue
{
    public interface IDeleteIssueUseCase
    {
        Task<bool> Execute(Guid id, DeleteIssueRequest request);
    }
}
