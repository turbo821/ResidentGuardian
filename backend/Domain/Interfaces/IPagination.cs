using Domain.Models;

namespace Domain.Interfaces
{
    public interface IPagination<T>
    {
        Task<(IQueryable<T>, int)> Apply(IQueryable<T> query, IssueFilterRequest filterRequest);
    }
}
