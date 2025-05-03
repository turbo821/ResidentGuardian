namespace Domain.Entities
{
    public class Answer
    {
        public Guid Id { get; set; }

        public Guid IssueId { get; set; }
        public Issue Issue { get; set; } = null!;

        public Guid ModeratorId { get; set; }
        public User Moderator { get; set; } = null!;

        public IssueStatus OldStatus { get; set; }
        public IssueStatus NewStatus { get; set; }

        public List<AnswerImage> Images { get; set; } = new(); 
        public string? Text { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
