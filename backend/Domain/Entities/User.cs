using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FullName { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public List<Issue> Issues { get; set; } = new();
        public List<Answer> Answers { get; set; } = new();
        public List<ModeratorCategory> ModeratorCategories { get; set; } = new();
    }
}
