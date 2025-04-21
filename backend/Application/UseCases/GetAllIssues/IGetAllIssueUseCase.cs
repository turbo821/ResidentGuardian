using Domain.Models;

namespace Application.UseCases.GetAllIssues
{
    public interface IGetAllIssueUseCase
    {
        Task<IEnumerable<GetAllIssueResponse>?> Execute(IssueFilterRequest request);
    }
}
