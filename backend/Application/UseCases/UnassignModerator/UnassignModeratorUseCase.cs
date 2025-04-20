using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.UnassignModerator
{
    public class UnassignModeratorUseCase : IUnassignModeratorUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICategoryRepository _repo;

        public UnassignModeratorUseCase(UserManager<User> userManager, ICategoryRepository repo)
        {
            _userManager = userManager;
            _repo = repo;
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

            return save;
        }
    }
}
