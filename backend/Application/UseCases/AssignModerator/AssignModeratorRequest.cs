using System.ComponentModel.DataAnnotations;

namespace Application.UseCases.AssignModerator
{
    public record AssignModeratorRequest([EmailAddress]string Email);
}
