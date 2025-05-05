using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.Services
{
    public class IssueSortService : ISort<Issue>
    {
        public IQueryable<Issue> Apply(IQueryable<Issue> query, IssueSortOrder sortOrder)
        {
            if(sortOrder == IssueSortOrder.NewestFirst)
                return query.OrderByDescending(issue => issue.CreatedAt);

            if(sortOrder == IssueSortOrder.OldestFirst)
                return query.OrderBy(issue => issue.CreatedAt);

            if (sortOrder == IssueSortOrder.ByRating)
                return query.OrderByDescending(issue => issue.Grades.Count);

            return query;
        }
    }
}
