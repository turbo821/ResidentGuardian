using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class StatusHistoryConfiguration : IEntityTypeConfiguration<StatusHistory>
    {
        public void Configure(EntityTypeBuilder<StatusHistory> builder)
        {
            builder
                .Property(i => i.NewStatus)
                .HasConversion<string>()
            .HasMaxLength(30);

            builder
                .Property(i => i.OldStatus)
                .HasConversion<string>()
            .HasMaxLength(30);

            builder
                .HasOne(h => h.ChangedByModerator)
                .WithMany(u => u.StatusHistories);

            builder
                .HasOne(h => h.Issue)
                .WithMany(i => i.StatusHistories);
        }
    }
}
