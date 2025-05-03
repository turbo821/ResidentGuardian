
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IAnswerRepository
    {
        Task<IEnumerable<Answer>?> GetAllByIssueId(Guid issueId);
        Task<Answer?> GetById(Guid id);
        Task<Answer?> AddAnswer(Answer answer);
    }
}
