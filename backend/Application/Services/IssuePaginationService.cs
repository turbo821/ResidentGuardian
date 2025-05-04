using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class IssuePaginationService : IPagination<Issue>
    {
        public async Task<(IQueryable<Issue>, int)> Apply(IQueryable<Issue> query, IssueFilterRequest request)
        {
            int totalItems = await query.CountAsync();

            if(request.PageSize != null)
                query = query
                    .Skip((request.PageNumber - 1) * request.PageSize.Value)
                    .Take(request.PageSize.Value);

            return (query, totalItems);
        }
    }
}
