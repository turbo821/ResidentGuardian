using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Application.UseCases.CreateIssue
{
    public record CreateIssueRequest(
        string Title,
        string? Description,
        Guid CategoryId,
        IEnumerable<IFormFile> Images,
        string Location,

        [RegularExpression(@"^[0-9\.]+$")]
        string PointLatitude,

        [RegularExpression(@"^[0-9\.]+$")]
        string PointLongitude
        );
}
