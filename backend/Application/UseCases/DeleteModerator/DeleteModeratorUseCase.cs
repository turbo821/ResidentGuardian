
using Application.Services.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases.DeleteModerator
{
    public class DeleteModeratorUseCase : IDeleteModeratorUseCase
    {
        private readonly IUserRepository _repo;
        private readonly ICacheService _cache;
        private const string CacheKey = "AllModerators";

        public DeleteModeratorUseCase(IUserRepository repo, ICacheService cache)
        {
            _repo = repo;
            _cache = cache;
        }

        public async Task<bool> Execute(Guid id)
        {
            await _cache.RemoveAsync(CacheKey);
            return await _repo.Remove(id);
        }
    }
}
