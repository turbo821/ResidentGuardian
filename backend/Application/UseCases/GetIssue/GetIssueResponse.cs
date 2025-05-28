using Application.Dtos;
using Domain.Entities;

namespace Application.UseCases.GetIssue
{
    public record GetIssueResponse(Guid Id, 
        string Title, IssueStatus Status, string? Description, string CategoryTitle, Guid CategoryId, 
        string Location, IEnumerable<double> Coords, IEnumerable<string> Images, Guid UserId,
        DateTime CreatedAt, DateTime? ModifiedOn,
        bool? Like, int LikeCount, int DislikeCount);
}
