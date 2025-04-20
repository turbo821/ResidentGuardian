using Domain.Entities;

namespace Application.UseCases.GetModerators
{
    public record GetModeratorsResponse(
        Guid Id, 
        string FullName, 
        string Email, 
        IEnumerable<string> Roles, 
        IEnumerable<Guid> ModeratorCategories
    );
}
