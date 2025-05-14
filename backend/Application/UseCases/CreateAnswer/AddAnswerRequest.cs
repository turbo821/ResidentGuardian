
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.UseCases.CreateAnswer
{
    public record AddAnswerRequest(string Text, IssueStatus UpdateStatus, IEnumerable<IFormFile>? Images);
}
