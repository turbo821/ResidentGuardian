using Domain.Entities;
using Domain.Models;

namespace Domain.Interfaces
{
    public interface IIssueRepository
    {
        Task<(IEnumerable<Issue>, int)> GetAll(IssueFilterRequest request);
        Task<IEnumerable<Issue>> GetAllByUser(Guid userID);
        Task<IEnumerable<Issue>> GetAllByModerator(Guid moderatorId);
        Task<Issue?> GetById(Guid id);
        Task<Guid?> Add(Issue issue);
        Task<bool> Update(Issue issue);
        Task<bool> Delete(Issue issue);
        Task<bool> IsExist(Guid id);
        Task<IssueStatus?> ChangeStatus(Guid id, IssueStatus newStatus);
        Task<bool> CheckModeratorToIssueAccess(Guid moderatorId, Guid issueId);
    }
}
