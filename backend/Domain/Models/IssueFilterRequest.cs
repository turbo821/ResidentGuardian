
using Domain.Entities;

namespace Domain.Models
{
    public class IssueFilterRequest
    {
        // Sort
        public IssueSortOrder SortOrder { get; set; } = IssueSortOrder.NewestFirst;

        // Filter
        public Guid? CategoryId { get; set; }
        public IssueStatus? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Search { get; set; }
        public Guid? UserId { get; set; }

        // Pagination
        public int? PageSize { get; set; }
        public int PageNumber { get; set; } = 1;
    }
}
