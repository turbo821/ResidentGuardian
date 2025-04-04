using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace Infrastructure.Configurations
{
    public class ModeratorCategoryConfiguration : IEntityTypeConfiguration<ModeratorCategory>
    {
        public void Configure(EntityTypeBuilder<ModeratorCategory> builder)
        {
            builder
                .HasKey(mc => new { mc.ModeratorId, mc.CategoryId });

            builder
                .HasOne(mc => mc.Moderator)
                .WithMany(m => m.ModeratorCategories);

            builder
                .HasOne(mc => mc.Category)
                .WithMany(c => c.ModeratorCategories);
        }
    }
}
