using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.IssueFilters
{
    public class CategoryFilter : IFilter<Issue>
    {
        public IQueryable<Issue> Apply(IQueryable<Issue> query, IssueFilterRequest filterRequest)
        {
            if (filterRequest.CategoryId is null) return query;

            return query.Where(issue => issue.CategoryId == filterRequest.CategoryId);
        }
    }
}
