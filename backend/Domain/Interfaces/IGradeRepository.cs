
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IGradeRepository
    {
        Task<bool> AddGrade(Grade grade);
        Task<bool> DeleteGrade(Grade grade);
    }
}
