using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IIssueRepository
    {
        Task<IEnumerable<Issue>> GetAll();
        Task<Issue?> GetById(Guid id);
        Task<Guid?> Add(Issue issue);
        Task<bool> Update(Issue issue);
        Task<bool> Delete(Issue issue);
        Task<bool> IsExist(Guid id);
    }
}
