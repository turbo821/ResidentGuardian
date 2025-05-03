using Application.UseCases.GetUserIssues;
using Domain.Models;

namespace Application.UseCases.GetModeratorIssues
{
    public interface IGetModeratorIssuesUseCase
    {
        Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid moderatorId);
    }
}