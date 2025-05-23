
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentRepository(AppGuardContext context) 
        : BaseRepository(context), ICommentRepository
    {
        public async Task<IEnumerable<Comment>> GetAllByIssueId(Guid issueId)
        {
            var comments = await _context.Comments
                .Include(c => c.User)
                .Where(c => c.IssueId == issueId)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();

            return comments;
        }

        public async Task<Comment?> GetById(Guid id)
        {
            return await _context.Comments.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment?> Add(Comment comment)
        {
            _context.Comments.Add(comment);

            if (await Save())
            {
                return await GetById(comment.Id);
            }

            return null;
        }

        public async Task<bool> Delete(Comment comment)
        {
            if (!await _context.Comments.AnyAsync(x => x.Id == comment.Id))
                return false;

            _context.Comments.Remove(comment);

            return await Save();
        }
    }
}
