
using Application.UseCases.GetModerators;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.AssignModerator
{
    public class AssignModeratorUseCase : IAssignModeratorUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;

        public AssignModeratorUseCase(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<GetModeratorsResponse?> Execute(AssignModeratorRequest request)
        {
            var email = request.Email;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }

            if (!await _userManager.IsInRoleAsync(user, "Moderator"))
            {
                var result = await _userManager.AddToRoleAsync(user, "Moderator");
                if (!result.Succeeded) return null;
            }

            var roles = await _userManager.GetRolesAsync(user);
            var userDto = new GetModeratorsResponse(
                user.Id,
                user.FullName,
                user.Email!,
                roles,
                user.ModeratorCategories
            );

            return userDto;
        }
    }
}
