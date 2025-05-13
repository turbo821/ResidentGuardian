
using Application.UseCases.GetModerators;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.AssignModerator
{
    public class AssignModeratorUseCase : IAssignModeratorUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICategoryRepository _repo;

        public AssignModeratorUseCase(UserManager<User> userManager, ICategoryRepository repo)
        {
            _userManager = userManager;
            _repo = repo;
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

            if(request.CategoryIds != null)
                await _repo.UpdateModeratorCategories(user.Id, request.CategoryIds);

            var roles = await _userManager.GetRolesAsync(user);
            var userDto = new GetModeratorsResponse(
                user.Id,
                user.FullName,
                user.Email!,
                roles,
                user.ModeratorCategories.Select(mc => mc.CategoryId)
            );

            return userDto;
        }
    }
}
