using Domain.Entities;

namespace Application.UseCases.GetAllIssues
{
    public record GetAllIssueResponse(Guid Id, string Title, IssueStatus Status, string Image, IEnumerable<double> Coords); 
}
