using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class IssueConfiguration : IEntityTypeConfiguration<Issue>
    {
        public void Configure(EntityTypeBuilder<Issue> builder)
        {
            builder
                .HasIndex(i => i.Status);

            builder
                .Property(i => i.Status)
                .HasConversion<string>()
                .HasMaxLength(30);

            builder.HasOne(i => i.Category)
                .WithMany(c => c.Issues)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.HasOne(i => i.User)
                .WithMany(u => u.Issues)
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
