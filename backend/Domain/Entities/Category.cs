namespace Domain.Entities
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ImageUri { get; set; } = null!;
        public List<Issue> Issues { get; set; } = new();
        public List<ModeratorCategory> ModeratorCategories { get; set; } = new();
    }
}
