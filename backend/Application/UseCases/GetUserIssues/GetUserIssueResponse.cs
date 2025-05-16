using Domain.Entities;

namespace Application.UseCases.GetUserIssues
{
    public record GetUserIssueResponse(Guid Id, string Title, IssueStatus Status, 
        DateTime CreatedAt, string Location, string Category,
        bool? Like, int LikeCount, int DislikeCount);
}
