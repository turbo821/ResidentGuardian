using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.UseCases.CreateAnswer
{
    public record CreateAnswerRequest(
        Guid IssueId, Guid ModeratorId,
        string? Text, IssueStatus UpdateStatus, IEnumerable<IFormFile>? Images
    );
}