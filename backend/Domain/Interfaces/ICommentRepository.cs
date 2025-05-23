
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment?> GetById(Guid id);
        Task<IEnumerable<Comment>> GetAllByIssueId(Guid issueId);
        Task<Comment?> Add(Comment comment);
        Task<bool> Delete(Comment comment);
    }
}
