using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppGuardContext(DbContextOptions<AppGuardContext> options) 
        : IdentityDbContext<User, IdentityRole<Guid>, Guid>(options)
    {
        public DbSet<Issue> Issues => Set<Issue>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<StatusHistory> StatusHistories => Set<StatusHistory>();
        public DbSet<ModeratorCategory> ModeratorCategories => Set<ModeratorCategory>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ModeratorCategory>()
                .HasKey(mc => new { mc.ModeratorId, mc.CategoryId });

            modelBuilder.Entity<Issue>()
                .HasIndex(i => i.Status);

            modelBuilder.Entity<Issue>()
                .Property(i => i.Status)
                .HasConversion<string>()
                .HasMaxLength(30);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<StatusHistory>()
                .Property(i => i.NewStatus)
                .HasConversion<string>()
                .HasMaxLength(30);

            modelBuilder.Entity<StatusHistory>()
                .Property(i => i.OldStatus)
                .HasConversion<string>()
                .HasMaxLength(30);

            modelBuilder.Entity<StatusHistory>()
                .HasOne(h => h.ChangedByUser)
                .WithMany(u => u.StatusHistories);

            modelBuilder.Entity<StatusHistory>()
                .HasOne(h => h.Issue)
                .WithMany(i => i.StatusHistories);

            modelBuilder.Entity<Issue>()
                .HasOne(i => i.Category)
                .WithMany(c => c.Issues);

            modelBuilder.Entity<Issue>()
                .HasOne(i => i.User)
                .WithMany(u => u.Issues);

            modelBuilder.Entity<ModeratorCategory>()
                .HasOne(mc => mc.Moderator)
                .WithMany(m => m.ModeratorCategories);

            modelBuilder.Entity<ModeratorCategory>()
                .HasOne(mc => mc.Category)
                .WithMany(c => c.ModeratorCategories);

            modelBuilder.HasPostgresExtension("postgis");
        }
    }
}
