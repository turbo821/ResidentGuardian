using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.GetModerators
{
    public class GetModeratorsUseCase : IGetModeratorsUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _repo;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);
        private const string CacheKey = "AllModerators";

        public GetModeratorsUseCase(UserManager<User> userManager, IUserRepository repo, ICacheService cache)
        {
            _userManager = userManager;
            _repo = repo;
            _cache = cache;
        }

        public async Task<IEnumerable<GetModeratorsResponse>> Execute()
        {
            var cachedResult = await _cache.GetAsync<IEnumerable<GetModeratorsResponse>>(CacheKey);

            if (cachedResult != null)
            {
                return cachedResult;
            }

            var moderators = await _userManager.GetUsersInRoleAsync("Moderator");
            if (moderators == null || !moderators.Any())
                return Enumerable.Empty<GetModeratorsResponse>();

            var moderatorsWithCategories = await _repo.GetUsersWithCategories(moderators.Select(m => m.Id));

            var rolesDictionary = await GetRolesForUsers(moderators);

            var result = new List<GetModeratorsResponse>();
            foreach (var moderator in moderatorsWithCategories)
            {
                rolesDictionary.TryGetValue(moderator.Id, out var roles);
                result.Add(new GetModeratorsResponse(
                    moderator.Id,
                    moderator.FullName,
                    moderator.Email!,
                    roles ?? new List<string>(),
                    moderator.ModeratorCategories?.Select(mc => mc.CategoryId) ?? Enumerable.Empty<Guid>()
                ));
            }

            await _cache.SetAsync(CacheKey, result, _cacheExpiration);

            return result;
        }

        private async Task<Dictionary<Guid, List<string>>> GetRolesForUsers(IEnumerable<User> users)
        {
            var result = new Dictionary<Guid, List<string>>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                result.Add(user.Id, roles.ToList());
            }
            return result;
        }
    }
}
