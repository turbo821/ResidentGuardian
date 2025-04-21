using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class IssueRepository : IIssueRepository
    {
        private readonly AppGuardContext _context;
        private readonly IEnumerable<IFilter<Issue>> _filters;

        public IssueRepository(AppGuardContext context, IEnumerable<IFilter<Issue>> filters)
        {
            _context = context;
            _filters = filters;
        }
        public async Task<IEnumerable<Issue>> GetAll(IssueFilterRequest request)
        {
            IQueryable<Issue> issuesQuery = _context.Issues.OrderByDescending(issue => issue.CreatedAt);
            foreach(var filter in _filters)
                issuesQuery = filter.Apply(issuesQuery, request);

            var issues = await issuesQuery
                .Include(i => i.Images).ToListAsync();

            return issues;
        }

        public async Task<Issue?> GetById(Guid id)
        {
            var issue = await _context.Issues
                .Include(i => i.Images).Include(i => i.Category).Include(i => i.Answers)
                .FirstOrDefaultAsync(x => x.Id == id);

            return issue;
        }

        public async Task<Guid?> Add(Issue issue)
        {
            if (issue == null)
                return null;

            await _context.Issues.AddAsync(issue);
            if(await Save())
                return issue.Id;
            return null;
        }

        public async Task<bool> Update(Issue issue)
        {
            // TODO?
            //int updatedRows = await _context.Issues
            //    .Where(i => i.Id == issue.Id)
            //    .ExecuteUpdateAsync(setters => setters
            //        .SetProperty(i => i.Status, issue.Status)
            //        .SetProperty(i => i.Description, issue.Description)
            //    );

            //return updatedRows > 0;
            if (!await IsExist(issue.Id))
                return false;

            _context.Issues.Update(issue);
            return await Save();
        }

        public async Task<bool> Delete(Issue issue)
        {
            if (!await IsExist(issue.Id))
                return false;

            _context.Issues.Remove(issue);

            return await Save();

        }

        public Task<bool> IsExist(Guid id)
        {
            return _context.Issues.AnyAsync(x => x.Id == id);
        }

        private async Task<bool> Save()
        {
            var saved = await _context.SaveChangesAsync();
            return saved > 0 ? true : false;
        }
    }
}
