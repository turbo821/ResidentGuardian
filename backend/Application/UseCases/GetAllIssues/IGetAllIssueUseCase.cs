namespace Application.UseCases.GetAllIssues
{
    public interface IGetAllIssueUseCase
    {
        Task<IEnumerable<GetAllIssueResponse>?> Execute();
    }
}
