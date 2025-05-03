
namespace Domain.Entities
{
    public class AnswerImage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Uri { get; set; } = null!;
        public Guid AnswerId { get; set; }
        public Answer Answer { get; set; } = null!;
    }
}
