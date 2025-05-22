using Application.Services.Interfaces;
using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetCategories
{
public class GetCategoriesUseCase : IGetCategoriesUseCase
{
    private readonly ICategoryRepository _repo;
    private readonly IMapper _mapper;
    private readonly ICacheService _cache;
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);
    private const string CacheKey = "AllCategories";

    public GetCategoriesUseCase(ICategoryRepository repo, IMapper mapper, ICacheService cache)
    {
        _repo = repo;
        _mapper = mapper;
        _cache = cache;
    }

    public async Task<IEnumerable<GetCategoriesResponse>?> Execute()
    {
        var cachedResponse = await _cache.GetAsync<IEnumerable<GetCategoriesResponse>?>(CacheKey);
        if (cachedResponse != null)
        {
            return cachedResponse;
        }

        var categories = await _repo.GetAll();
        if (categories == null || !categories.Any())
        {
            return null;
        }

        var response = _mapper.Map<IEnumerable<GetCategoriesResponse>>(categories);

        await _cache.SetAsync(CacheKey, response, _cacheExpiration);

        return response;
    }
}
}
