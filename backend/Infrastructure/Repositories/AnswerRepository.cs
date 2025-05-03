using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AnswerRepository(AppGuardContext context)
        : BaseRepository(context), IAnswerRepository
    {
        public async Task<IEnumerable<Answer>?> GetAllByIssueId(Guid issueId)
        {
            var answers = await _context.Answers
                .Include(a => a.Moderator)
                .Include(a => a.Images)
                .Where(a => a.IssueId == issueId)
                .OrderBy(a => a.CreatedAt)
                .ToListAsync();

            return answers;
        }

        public async Task<Answer?> GetById(Guid id)
        {
            var answer = await _context.Answers
                .Include(a => a.Moderator).FirstOrDefaultAsync(a => a.Id == id);

            return answer;
        }
        public async Task<Answer?> AddAnswer(Answer answer)
        {
            _context.Answers.Add(answer);

            await Save();

            return await GetById(answer.Id);    
        }
    }
}
