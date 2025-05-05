
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GradeRepository(AppGuardContext context)
        : BaseRepository(context), IGradeRepository
    {
        public async Task<bool> AddGrade(Grade grade)
        {
            var isExistGrade = await _context.Grades.Where(g => g.UserId == grade.UserId && g.IssueId == grade.IssueId).AnyAsync();
            if (isExistGrade) return false;

            _context.Grades.Add(grade);
            return await Save();
        }

        public async Task<bool> DeleteGrade(Grade grade)
        {
            var existGrade = await _context.Grades.FirstOrDefaultAsync(g => g.UserId == grade.UserId && g.IssueId == grade.IssueId);
            if (existGrade is null) return false;

            _context.Grades.Remove(existGrade);
            return await Save();
        }
    }
}
