using Microsoft.AspNetCore.Http;

namespace Application.UseCases.CreateIssue
{
    public record CreateIssueRequest(
        string Title,
        string? Description,
        Guid CategoryId,
        IEnumerable<IFormFile> Images,
        string Location,
        string PointLatitude,
        string PointLongitude
        );
}
