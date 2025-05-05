using NetTopologySuite.Geometries;

namespace Domain.Entities
{
    public class Issue
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public IssueStatus Status { get; set; } = IssueStatus.Pending;
        public string Location { get; set; } = null!;
        public Point? Point { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public List<IssueImage> Images { get; set; } = new();
        public List<Answer> Answers { get; set; } = new();
        public List<Comment> Comments { get; set; } = new();
        public List<Grade> Grades { get; set; } = new();
    }
}
