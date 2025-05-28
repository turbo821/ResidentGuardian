using Application.Dtos;
using Domain.Models;

namespace Application.UseCases.GetAllRevoredIssue
{
    public interface IGetAllRevoredIssueUseCase
    {
        Task<PaginatedResult<GetAllRevoredIssueResponse>?> Execute(IssueFilterRequest request, Guid? userId);
    }
}