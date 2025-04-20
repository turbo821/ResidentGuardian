using Application.UseCases.AddModeratorRoles;
using Application.UseCases.GetModerators;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.AddModeratorCategories
{
    public class AddModeratorCategoriesUseCase : IAddModeratorCategoriesUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICategoryRepository _repo;

        public AddModeratorCategoriesUseCase(
            UserManager<User> userManager,
            ICategoryRepository repo)
        {
            _userManager = userManager;
            _repo = repo;
        }

        public async Task<GetModeratorsResponse?> Execute(AddModeratorCategoriesRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return null;

            var isModerator = await _userManager.IsInRoleAsync(user, "Moderator");
            if (!isModerator)
                return null;

            await _repo.AddModeratorCategories(user.Id, request.CategoryIds);

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
