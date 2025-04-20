using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersWithCategories(IEnumerable<Guid> userIds);
        Task<bool> RemoveUser(Guid id);
    }
}
