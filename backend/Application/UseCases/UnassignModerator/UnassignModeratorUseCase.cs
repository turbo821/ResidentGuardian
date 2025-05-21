using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.UnassignModerator
{
    public class UnassignModeratorUseCase : IUnassignModeratorUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICategoryRepository _repo;
        private readonly ICacheService _cache;
        private const string CacheKey = "AllModerators";

        public UnassignModeratorUseCase(UserManager<User> userManager, ICategoryRepository repo, ICacheService cache)
        {
            _userManager = userManager;
            _repo = repo;
            _cache = cache;
        }

        public async Task<bool> Execute(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user is null) return false;

            if (!await _userManager.IsInRoleAsync(user, "Moderator"))
                return true;


            var result = await _userManager.RemoveFromRoleAsync(user, "Moderator");

            if (!result.Succeeded)
                return false;

            var save = await _repo.RemoveModeratorCategories(user.Id);
            await _cache.RemoveAsync(CacheKey);

            return save;
        }
    }
}
