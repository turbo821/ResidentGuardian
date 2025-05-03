using Domain.Entities;

namespace Application.Dtos
{
    public record AnswerDto(
        Guid Id, string FullName, 
        IssueStatus OldStatus, IssueStatus NewStatus, 
        IEnumerable<string>? Images, 
        string? Text, DateTime CreatedAt
    );
}
