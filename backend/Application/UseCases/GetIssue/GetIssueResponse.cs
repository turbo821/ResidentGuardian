using Domain.Entities;

namespace Application.UseCases.GetIssue
{
    public record GetIssueResponse(Guid Id, 
        string Title, IssueStatus Status, string? Description, string Category, 
        IEnumerable<string> Images, IEnumerable<Answer>? Answers);
}
