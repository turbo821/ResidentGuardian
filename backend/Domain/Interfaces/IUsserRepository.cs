using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersWithCategories(IEnumerable<Guid> userIds);
        Task<User?> FindByFullNameAsync(string fullName);
        Task<bool> RemoveUser(Guid id);
    }
}
