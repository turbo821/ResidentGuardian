using Application.Services.Interfaces;
using Application.UseCases.GetCategories;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.UpdateCategory
{
    public class UpdateCategoryUseCase : IUpdateCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFileStorage _fileStorage;
        private readonly ICacheService _cache;
        private const string AllCategoriesCacheKey = "AllCategories";
        private const string AllIssuesCacheKey = "AllIssues";

        public UpdateCategoryUseCase(ICategoryRepository repo, IMapper mapper, IFileStorage fileStorage, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _fileStorage = fileStorage;
            _cache = cache;
        }

        public async Task<GetCategoriesResponse?> Execute(UpdateCategoryRequest categoryDto)
        {
            string imageUri = (await _repo.GetById(categoryDto.Id))!.ImageUri;
            if (categoryDto.Image != null)
            {
                _fileStorage.DeleteImage(imageUri ?? "");
                imageUri = await _fileStorage.SaveImageAsync(categoryDto.Image);
            }

            var category = new Category
            {
                Id = categoryDto.Id,
                Title = categoryDto.Title,
                Description = categoryDto.Description,
                ImageUri = imageUri
            };

            var success = await _repo.Update(category);
            if(!success)
                return null;

            var editCategory = _mapper.Map<GetCategoriesResponse>(category);
            await _cache.RemoveByPatternAsync(AllCategoriesCacheKey);
            await _cache.RemoveByPatternAsync(AllIssuesCacheKey);

            return editCategory;
        }
    }
}
