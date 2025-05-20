using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Application.UseCases.UpdateIssue
{
    public record UpdateIssueRequest(
        string Title, 
        string? Description,
        Guid CategoryId,
        IEnumerable<IFormFile>? Images,
        IEnumerable<string> imagesToKeep,
        string Location,

        [RegularExpression(@"^[0-9\.]+$")]
        string PointLatitude,

        [RegularExpression(@"^[0-9\.]+$")]
        string PointLongitude);
}
