using Application.Dtos;
using Domain.Models;

namespace Application.UseCases.GetAllIssues
{
    public interface IGetAllIssueUseCase
    {
        Task<PaginatedResult<GetAllIssueResponse>?> Execute(IssueFilterRequest request, Guid? userId);
    }
}
