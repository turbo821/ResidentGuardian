namespace Application.UseCases.GetUserIssues
{
    public interface IGetUserIssuesUseCase
    {
        Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid id);
    }
}