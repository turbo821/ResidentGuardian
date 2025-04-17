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
        private readonly IFileStorage _fileStorage;

        public CreateCategoryUseCase(ICategoryRepository repo, IMapper mapper, IFileStorage fileStorage)
        {
            _repo = repo;
            _mapper = mapper;
            _fileStorage = fileStorage;
        }
        public async Task<GetCategoriesResponse?> Execute(CreateCategoryRequest categoryDto)
        {
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
            return newCategory;
        }
    }
}
