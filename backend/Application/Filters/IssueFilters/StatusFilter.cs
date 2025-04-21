using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.IssueFilters
{
    public class StatusFilter : IFilter<Issue>
    {
        public IQueryable<Issue> Apply(IQueryable<Issue> query, IssueFilterRequest filterRequest)
        {
            if (filterRequest.Status is null) return query;

            return query.Where(issue => issue.Status == filterRequest.Status);
        }
    }
}
