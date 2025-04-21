using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.IssueFilters
{
    public class TakeFilter : IFilter<Issue>
    {
        public IQueryable<Issue> Apply(IQueryable<Issue> query, IssueFilterRequest filterRequest)
        {
            if (filterRequest.Size is null) return query;

            int size = filterRequest.Size.Value;
            return query.Take(size);
        }
    }
}
