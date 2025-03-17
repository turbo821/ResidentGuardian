namespace Domain.Entities
{
    public class StatusHistory
    {
        public Guid Id { get; set; }
        public IssueStatus OldStatus { get; set; }
        public IssueStatus NewStatus { get; set; }
        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;

        public Guid IssueId { get; set; }
        public Issue Issue { get; set; } = null!;

        public Guid ChangedByModeratorId { get; set; }
        public User ChangedByModerator { get; set; } = null!;
    }
}
