using NetTopologySuite.Geometries;

namespace Domain.Entities
{
    public class Issue
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public IssueStatus Status { get; set; } = IssueStatus.Pending;
        public string? Location { get; set; }
        public Point? Point { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? UserId { get; set; }
        public User? User { get; set; } // = null!; -- its test

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; } // = null!; -- its test

        public List<IssueImage> Images { get; set; } = new();
        public List<Answer> Answers { get; set; } = new();
        public List<StatusHistory> StatusHistories { get; set; } = new();
    }
}
