using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class IssueRepository : IIssueRepository
    {
        private readonly AppGuardContext _context;

        public IssueRepository(AppGuardContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Issue>> GetAll()
        {
            var issues = await _context.Issues.ToListAsync();
            return issues;
        }

        public async Task<Issue?> GetById(Guid id)
        {
            var issue = await _context.Issues.FirstOrDefaultAsync(x => x.Id == id);
            return issue;
        }

        public async Task<Guid?> Add(Issue issue)
        {
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

            _context.Issues.Update(issue);
            return await Save();
        }

        public async Task<bool> Delete(Issue issue)
        {
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
