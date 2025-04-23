using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.IssueFilters
{
    public class TimeRangeFilter : IFilter<Issue>
    {
        public IQueryable<Issue> Apply(IQueryable<Issue> query, IssueFilterRequest filterRequest)
        {
            if (filterRequest.StartDate is null && filterRequest.EndDate is null) return query;

            if (filterRequest.StartDate is DateTime)
                query = query.Where(issue => issue.CreatedAt >= filterRequest.StartDate);

            if (filterRequest.EndDate is DateTime)
                query = query.Where(issue => issue.CreatedAt <= filterRequest.EndDate);

            return query;
        }
    }
}
