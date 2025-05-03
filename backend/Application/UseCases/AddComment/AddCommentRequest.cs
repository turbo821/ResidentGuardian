
namespace Application.UseCases.AddComment
{
    public record AddCommentRequest(Guid? IssueId, Guid? UserId, string Text);
}
