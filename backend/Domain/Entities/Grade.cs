
namespace Domain.Entities
{
    public class Grade
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public Guid IssueId { get; set; }
        public Issue Issue { get; set; } = null!;
        public bool Like { get; set; }
    }
}
