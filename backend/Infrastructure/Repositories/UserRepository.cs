using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository(AppGuardContext context)
        : BaseRepository(context), IUserRepository
    {
        public async Task<IEnumerable<User>> GetUsersWithCategories(IEnumerable<Guid> userIds)
        {
            var users = await _context.Users
                .Where(u => userIds.Contains(u.Id))
                .Include(u => u.ModeratorCategories)
                .ThenInclude(mc => mc.Category)
                .ToListAsync();

            return users;
        }

        public async Task<User?> FindByFullNameAsync(string fullName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.FullName == fullName);
        }

        public async Task<bool> Remove(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null) return false;

            _context.Users.Remove(user);
            return await Save();
        }

        public async Task<bool> Update(User user)
        {
            _context.Users.Update(user);
            return await Save();
        }
    }
}
