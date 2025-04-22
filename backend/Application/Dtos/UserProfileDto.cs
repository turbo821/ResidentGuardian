namespace Application.Dtos
{
    public record UserProfileDto(Guid Id, 
        string FullName, 
        string Email, 
        List<string> Roles,
        DateTime CreatedAt);
}
