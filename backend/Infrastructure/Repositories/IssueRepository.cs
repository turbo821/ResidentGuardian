using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class IssueRepository : BaseRepository, IIssueRepository
    {
        private readonly IEnumerable<IFilter<Issue>> _filters;

        public IssueRepository(AppGuardContext context, IEnumerable<IFilter<Issue>> filters)
            : base(context)
        {
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

        public async Task<IEnumerable<Issue>> GetAllByUser(Guid userId)
        {
            var issues = await _context.Issues
                .Where(issue => issue.UserId == userId)
                .OrderByDescending(issue => issue.CreatedAt)
                .ToListAsync();

            return issues;
        }

        public async Task<IEnumerable<Issue>> GetAllByModerator(Guid moderatorId)
        {
            var issues = await _context.Issues
                .Where(issue => issue.Category.ModeratorCategories.Any(mc => mc.ModeratorId == moderatorId))
                .OrderByDescending(issue => issue.CreatedAt)
                .ToListAsync();

            return issues;
        }

        public async Task<Issue?> GetById(Guid id)
        {
            var issue = await _context.Issues
                .Include(i => i.Images).Include(i => i.Category)
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

        public async Task<IssueStatus?> ChangeStatus(Guid id, IssueStatus newStatus)
        {
            var issue = await GetById(id);
            if (issue == null) return null;

            var oldStatus = issue.Status;
            issue.Status = newStatus;
            await Save();
            return oldStatus;
        }

        public async Task<bool> CheckModeratorToIssueAccess(Guid moderatorId, Guid issueId)
        {
            var moderatorCategoriesId = await _context.ModeratorCategories
                .Where(mc => mc.ModeratorId == moderatorId).Select(mc => mc.CategoryId)
                .ToListAsync();

            var issue = await _context.Issues.FirstOrDefaultAsync(i => i.Id == issueId);

            return issue is not null && moderatorCategoriesId.Contains(issue.CategoryId);
                
        }
    }
}
