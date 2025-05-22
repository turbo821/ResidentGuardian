using Application.UseCases.GetModeratorCategories;

namespace Application.Dtos
{
    public record UserProfileDto(Guid Id, 
        string FullName, 
        string Email, 
        IEnumerable<string> Roles,
        DateTime CreatedAt);
}
