namespace Application.UseCases.GetIssue
{
    public record GetIssueResponse(Guid Id, string Title, string Description);
}
