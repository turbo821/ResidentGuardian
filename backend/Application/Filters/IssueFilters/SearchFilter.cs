using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Filters.IssueFilters
{
    public class SearchFilter : IFilter<Issue>
    {
        public IQueryable<Issue> Apply(IQueryable<Issue> query, IssueFilterRequest filterRequest)
        {
            var searchQuery = filterRequest.Search?.ToUpper().Trim();

            if (string.IsNullOrEmpty(searchQuery)) return query;

            return query.Where(issue =>
                issue.Title.ToUpper().Contains(searchQuery) ||
                issue.Location.ToUpper().Contains(searchQuery) ||
                issue.Description != null && issue.Description.ToUpper().Contains(searchQuery));
        }
    }
}
