namespace Domain.Entities
{
    public class ModeratorCategory
    {
        public Guid ModeratorId { get; set; }
        public User Moderator { get; set; } = null!;

        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}
