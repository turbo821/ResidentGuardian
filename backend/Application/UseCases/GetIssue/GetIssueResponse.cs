using Application.Dtos;
using Domain.Entities;

namespace Application.UseCases.GetIssue
{
    public record GetIssueResponse(Guid Id, 
        string Title, IssueStatus Status, string? Description, string Category, 
        string Location, IEnumerable<string> Images);
}
