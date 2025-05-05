namespace Application.UseCases.GetIssue
{
    public interface IGetIssueUseCase
    {
        Task<GetIssueResponse?> Execute(Guid id, Guid? userId);
    }
}
