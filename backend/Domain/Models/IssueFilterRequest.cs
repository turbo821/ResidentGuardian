
using Domain.Entities;

namespace Domain.Models
{
    public class IssueFilterRequest
    {
        // Sort
        public IssueSortOrder SortOrder { get; set; } = IssueSortOrder.ByRating;

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

        public string GetCacheKey()
        {
            var parts = new List<string>
            {
                $"sort={IssueSortOrder.ByRating}",
                $"catId={CategoryId}",
                $"status={Status}",
                $"start={StartDate}",
                $"end={EndDate}",
                $"search={Search}",
                $"userId={UserId}",
                $"page={PageNumber}",
                $"size={PageSize}",
            };

            return string.Join(";", parts);
        }
    }
}
