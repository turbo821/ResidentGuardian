namespace Application.UseCases.UpdateIssue
{
    public record UpdateIssueRequest(Guid Id, string Title, string Description);
}
