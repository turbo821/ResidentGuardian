using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppGuardContext _context;

        public UserRepository(AppGuardContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsersWithCategories(IEnumerable<Guid> userIds)
        {
            var users = await _context.Users
                .Where(u => userIds.Contains(u.Id))
                .Include(u => u.ModeratorCategories)
                .ThenInclude(mc => mc.Category)
                .ToListAsync();

            return users;
        }

        public async Task<bool> RemoveUser(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null) return false;

            _context.Users.Remove(user);
            return await Save();
        }

        private async Task<bool> Save()
        {
            var saved = await _context.SaveChangesAsync();
            return saved > 0 ? true : false;
        }
    }
}
