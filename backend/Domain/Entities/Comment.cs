
namespace Domain.Entities
{
    public class Comment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Text { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public Guid IssueId { get; set; }
        public Issue Issue { get; set; } = null!;
    }
}
