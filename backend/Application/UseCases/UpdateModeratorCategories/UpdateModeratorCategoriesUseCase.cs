using Application.Services.Interfaces;
using Application.UseCases.AddModeratorRoles;
using Application.UseCases.GetModerators;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.UpdateModeratorCategories
{
    public class UpdateModeratorCategoriesUseCase : IUpdateModeratorCategoriesUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICategoryRepository _repo;
        private readonly ICacheService _cache;
        private const string CacheKey = "AllModerators";

        public UpdateModeratorCategoriesUseCase(UserManager<User> userManager, ICategoryRepository repo, ICacheService cache)
        {
            _userManager = userManager;
            _repo = repo;
            _cache = cache;
        }

        public async Task<GetModeratorsResponse?> Execute(UpdateModeratorCategoriesRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return null;

            var isModerator = await _userManager.IsInRoleAsync(user, "Moderator");
            if (!isModerator)
                return null;

            await _repo.UpdateModeratorCategories(user.Id, request.CategoryIds);

            var roles = await _userManager.GetRolesAsync(user);
            var userDto = new GetModeratorsResponse(
                user.Id,
                user.FullName,
                user.Email!,
                roles,
                user.ModeratorCategories.Select(mc => mc.CategoryId)
            );

            await _cache.RemoveByPatternAsync(CacheKey);
            return userDto;
        }
    }
}
