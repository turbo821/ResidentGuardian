using Domain.Entities;
using Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppGuardContext(DbContextOptions<AppGuardContext> options) 
        : IdentityDbContext<User, IdentityRole<Guid>, Guid>(options)
    {
        public DbSet<Issue> Issues => Set<Issue>();
        public DbSet<Answer> Answers => Set<Answer>();
        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<ModeratorCategory> ModeratorCategories => Set<ModeratorCategory>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
        public DbSet<IssueImage> IssueImages => Set<IssueImage>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new IssueConfiguration());
            modelBuilder.ApplyConfiguration(new ModeratorCategoryConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());

            modelBuilder.HasPostgresExtension("postgis");
        }
    }
}
