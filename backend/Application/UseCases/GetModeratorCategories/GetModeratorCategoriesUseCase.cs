using Application.Services.Interfaces;
using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetModeratorCategories
{
    public class GetModeratorCategoriesUseCase : IGetModeratorCategoriesUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);

        public GetModeratorCategoriesUseCase(ICategoryRepository repo, IMapper mapper, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<IEnumerable<GetModeratorCategoriesResponse>?> Execute(Guid moderatorId)
        {
            string cacheKey = $"AllCategories_AllModerators{moderatorId}";
            var cachedResult = await _cache.GetAsync<IEnumerable<GetModeratorCategoriesResponse>>(cacheKey);

            if (cachedResult != null)
            {
                return cachedResult;
            }

            var categories = await _repo.GetModeratorCategories(moderatorId);

            var categoryDtos = _mapper.Map<IEnumerable<GetModeratorCategoriesResponse>>(categories);
            await _cache.SetAsync(cacheKey, categoryDtos, _cacheExpiration);

            return categoryDtos;
        }
    }
}
