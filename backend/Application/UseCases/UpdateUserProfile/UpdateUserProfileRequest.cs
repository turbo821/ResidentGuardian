
using System.ComponentModel.DataAnnotations;

namespace Application.UseCases.UpdateProfile
{
    public record UpdateUserProfileRequest(
        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[a-zA-Z0-9а-яА-ЯёЁ]+$")]
        string FullName,

        [Required]
        [EmailAddress]
        string Email,

        string? CurrentPassword,
        string? NewPassword
        );
}
