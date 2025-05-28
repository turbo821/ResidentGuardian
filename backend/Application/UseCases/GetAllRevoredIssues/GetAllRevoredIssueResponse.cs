using Domain.Entities;

namespace Application.UseCases.GetAllRevoredIssue
{
    public record GetAllRevoredIssueResponse(
        Guid Id, string Title, string Category, IssueStatus Status, 
        bool SelfDeleted, DateTime RevoredOn,
        string Image, bool? Like, int LikeCount, int DislikeCount);
}
