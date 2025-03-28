namespace Application.Dtos
{
    public record IssueResponse(bool Success, Guid? IssueId = null, string? Message = null);
}
