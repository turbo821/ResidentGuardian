using Application.Dtos;

namespace Application.UseCases.CreateIssue
{
    public interface ICreateIssueUseCase
    {
        Task<Guid?> Execute(CreateIssueRequest issueDto);
    }
}
