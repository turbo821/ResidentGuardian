using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppGuardContext(DbContextOptions<AppGuardContext> options) : DbContext(options)
    {

    }
}
