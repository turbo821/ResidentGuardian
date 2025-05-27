using Application.Services.Interfaces;
using Application.UseCases.GetCategories;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateCategory
{
    public class CreateCategoryUseCase : ICreateCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorage;
        private readonly ICacheService _cache;
        private const string CacheKey = "AllCategories";

        public CreateCategoryUseCase(ICategoryRepository repo, IMapper mapper, IFileStorageService fileStorage, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _fileStorage = fileStorage;
            _cache = cache;
        }
        public async Task<GetCategoriesResponse?> Execute(CreateCategoryRequest categoryDto)
        {
            var existCategory = await _repo.GetByTitle(categoryDto.Title);
            if (existCategory != null) return null;

            var imageUri = await _fileStorage.SaveImageAsync(categoryDto.Image);
            var category = new Category 
            { 
                Title = categoryDto.Title,
                Description = categoryDto.Description, 
                ImageUri = imageUri 
            };

            var id = await _repo.Add(category);
            if (id is null)
                return null;

            category.Id = id.Value;

            var newCategory = _mapper.Map<GetCategoriesResponse>(category);
            await _cache.RemoveAsync(CacheKey);
            return newCategory;
        }
    }
}
