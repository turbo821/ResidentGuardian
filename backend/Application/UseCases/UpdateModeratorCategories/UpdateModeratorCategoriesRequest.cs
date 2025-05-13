using System.ComponentModel.DataAnnotations;

namespace Application.UseCases.AddModeratorRoles
{
    public record UpdateModeratorCategoriesRequest([EmailAddress]string Email, IEnumerable<Guid> CategoryIds);
}
