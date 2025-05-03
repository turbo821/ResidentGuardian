
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly AppGuardContext _context;

        public BaseRepository(AppGuardContext context)
        {
            _context = context;
        }

        protected async Task<bool> Save()
        {
            var saved = await _context.SaveChangesAsync();
            return saved > 0 ? true : false;
        }
    }
}
