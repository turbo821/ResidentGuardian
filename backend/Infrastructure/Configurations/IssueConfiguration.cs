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

            builder
                .HasOne(i => i.Category)
                .WithMany(c => c.Issues);

            builder
                .HasOne(i => i.User)
                .WithMany(u => u.Issues);
        }
    }
}
