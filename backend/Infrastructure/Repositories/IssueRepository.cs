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
        private readonly ISort<Issue> _sorted;
        private readonly IPagination<Issue> _pagination;

        public IssueRepository(AppGuardContext context, IEnumerable<IFilter<Issue>> filters, ISort<Issue> sorted, IPagination<Issue> pagination)
            : base(context)
        {
            _filters = filters;
            _sorted = sorted;
            _pagination = pagination;
        }
        public async Task<(IEnumerable<Issue>, int)> GetAll(IssueFilterRequest request, bool isRevoredIssue = false)
        {
            IQueryable<Issue> issuesQuery;
            if (isRevoredIssue)
                issuesQuery = _context.Issues.Where(i => i.RevokedOn != null);
            else
                issuesQuery = _context.Issues.Where(i => i.RevokedOn == null);

            issuesQuery = _sorted.Apply(issuesQuery, request.SortOrder);

            foreach(var filter in _filters)
                issuesQuery = filter.Apply(issuesQuery, request);

            (issuesQuery, int totalCount) = await _pagination.Apply(issuesQuery, request);

            var issues = await issuesQuery.Include(i => i.Category)
                .Include(i => i.Images).Include(i => i.Grades).ToListAsync();

            return (issues, totalCount);
        }

        public async Task<IEnumerable<Issue>> GetAllByUser(Guid userId)
        {
            var issues = await _context.Issues
                .Where(i => i.RevokedOn == null)
                .Include(i => i.Category)
                .Include(i => i.Grades)
                .Where(issue => issue.UserId == userId)
                .OrderByDescending(issue => issue.CreatedAt)
                .ToListAsync();

            return issues;
        }

        public async Task<IEnumerable<Issue>> GetAllByModerator(Guid moderatorId)
        {
            var issues = await _context.Issues
                .Where(i => i.RevokedOn == null)
                .Include(i => i.Category)
                .Include(i => i.Grades)
                .Where(issue => issue.Category.ModeratorCategories.Any(mc => mc.ModeratorId == moderatorId))
                .OrderByDescending(issue => issue.CreatedAt)
                .ToListAsync();

            return issues;
        }

        public async Task<Issue?> GetById(Guid id)
        {
            var issue = await _context.Issues
                .Include(issue => issue.Images).Include(issue => issue.Category)
                .Include(issue => issue.Grades)
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
            _context.Entry(issue).State = EntityState.Modified;

            return await _context.SaveChangesAsync() > 0;

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

        public async Task RemoveImage(IssueImage image)
        {
            _context.IssueImages.Remove(image);
            await _context.SaveChangesAsync();
        }

        public async Task AddImage(Guid issueId, string imageUri)
        {
            var image = new IssueImage
            {
                Uri = imageUri,
                IssueId = issueId
            };
            _context.IssueImages.Add(image);
            await _context.SaveChangesAsync();
        }
    }
}
