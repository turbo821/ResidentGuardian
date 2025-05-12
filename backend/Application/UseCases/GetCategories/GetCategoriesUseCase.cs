using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.GetCategories
{
    public class GetCategoriesUseCase : IGetCategoriesUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICacheService _cache;

        public GetCategoriesUseCase(ICategoryRepository repo, IMapper mapper, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<IEnumerable<GetCategoriesResponse>?> Execute()
        {
            string cacheKey = "AllCategories";
            IEnumerable<Category>? categories = null;

            if (await _cache.ExistsAsync(cacheKey))
            {
                categories = await _cache.GetAsync<IEnumerable<Category>?>(cacheKey);
            }
            else
            {
                categories = await _repo.GetAll();
                await _cache.SetAsync(cacheKey, categories, TimeSpan.FromMinutes(30));
            }

            var categoryDtos = _mapper.Map<IEnumerable<GetCategoriesResponse>>(categories);
            return categoryDtos;
        }
    }
}
