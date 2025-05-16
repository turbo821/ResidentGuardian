
namespace Application.UseCases.DeleteIssue
{
    public record DeleteIssueRequest(Guid UserId, bool SoftDeletion = true);
}
