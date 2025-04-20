using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.GetModerators
{
    public class GetModeratorsUseCase : IGetModeratorsUseCase
    {
        private readonly UserManager<User> _userManager;

        public GetModeratorsUseCase(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<GetModeratorsResponse>> Execute()
        {
            var moderators = await _userManager.GetUsersInRoleAsync("Moderator");

            if (moderators == null || !moderators.Any())
                return Enumerable.Empty<GetModeratorsResponse>();

            var moderatorDtos = new List<GetModeratorsResponse>();
            foreach (var moderator in moderators)
            {
                var roles = await _userManager.GetRolesAsync(moderator);
                moderatorDtos.Add(new GetModeratorsResponse(
                    moderator.Id,
                    moderator.FullName,
                    moderator.Email!,
                    roles,
                    moderator.ModeratorCategories
                ));
            }

            return moderatorDtos;
        }
    }
}
