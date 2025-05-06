using Domain.Entities;

namespace Application.UseCases.GetUserIssues
{
    public record GetUserIssueResponse(Guid Id, string Title, IssueStatus Status, DateTime CreatedAt, string Location,
        bool? Like, int LikeCount, int DislikeCount);
}
