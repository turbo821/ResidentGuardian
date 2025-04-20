using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.GetModerators
{
    public class GetModeratorsUseCase : IGetModeratorsUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _repo;

        public GetModeratorsUseCase(UserManager<User> userManager, IUserRepository repo)
        {
            _userManager = userManager;
            _repo = repo;
        }

        public async Task<IEnumerable<GetModeratorsResponse>> Execute()
        {
            IEnumerable<User> moderators = await _userManager.GetUsersInRoleAsync("Moderator");

            if (moderators == null || !moderators.Any())
                return Enumerable.Empty<GetModeratorsResponse>();

            moderators = await _repo.GetUsersWithCategories(moderators.Select(m => m.Id));

            var moderatorDtos = new List<GetModeratorsResponse>();
            foreach (var moderator in moderators)
            {
                var mc = moderator.ModeratorCategories;

                var roles = await _userManager.GetRolesAsync(moderator);
                moderatorDtos.Add(new GetModeratorsResponse(
                    moderator.Id,
                    moderator.FullName,
                    moderator.Email!,
                    roles,
                    moderator.ModeratorCategories.Select(mc => mc.CategoryId)
                ));
            }

            return moderatorDtos;
        }
    }
}
