namespace Application.UseCases.RestoreIssue
{
    public interface IRestoreIssueUseCase
    {
        Task<bool> Execute(Guid id);
    }
}