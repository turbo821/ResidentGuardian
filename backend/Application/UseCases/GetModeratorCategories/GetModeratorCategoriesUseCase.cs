using Application.Services.Interfaces;
using Application.UseCases.GetCategories;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.GetModeratorCategories
{
    public class GetModeratorCategoriesUseCase : IGetModeratorCategoriesUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICacheService _cache;

        public GetModeratorCategoriesUseCase(ICategoryRepository repo, IMapper mapper, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<IEnumerable<GetModeratorCategoriesResponse>?> Execute(Guid moderatorId)
        {
            string cacheKey = $"AllCategories_Mod{moderatorId}";
            IEnumerable<Category>? categories = null;

            if (await _cache.ExistsAsync(cacheKey))
            {
                categories = await _cache.GetAsync<IEnumerable<Category>?>(cacheKey);
            }
            else
            {
                categories = await _repo.GetModeratorCategories(moderatorId);
                await _cache.SetAsync(cacheKey, categories, TimeSpan.FromMinutes(30));
            }

            var categoryDtos = _mapper.Map<IEnumerable<GetModeratorCategoriesResponse>>(categories);
            return categoryDtos;


        }
    }
}
