
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetAllByIssueId(Guid issueId);
        Task<Comment?> AddComment(Comment comment);
    }
}
