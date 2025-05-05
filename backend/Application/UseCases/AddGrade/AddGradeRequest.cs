namespace Application.UseCases.AddGrade
{
    public record AddGradeRequest(Guid IssueId, Guid UserId, bool Like);
}