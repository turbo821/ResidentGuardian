
using Domain.Entities;

namespace Domain.Models
{
    public record IssueFilterRequest(int? Size, 
        Guid? CategoryId, IssueStatus? Status, 
        DateTime? StartDate, DateTime? EndDate,
        string? Search);
}
