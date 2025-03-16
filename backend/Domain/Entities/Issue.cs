using NetTopologySuite.Geometries;

namespace Domain.Entities
{
    public class Issue
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public IssueStatus Status { get; set; } = IssueStatus.Pending;
        public string? PhotoUrl { get; set; }
        public string? Location { get; set; }
        public Point? Point { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        
        public List<Answer> Answer { get; set; } = new();
        public List<StatusHistory> StatusHistories { get; set; } = new();
    }
}
