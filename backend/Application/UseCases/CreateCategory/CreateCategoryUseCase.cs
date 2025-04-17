using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateCategory
{
    public class CreateCategoryUseCase : ICreateCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IFileStorage _fileStorage;

        public CreateCategoryUseCase(ICategoryRepository repo, IFileStorage fileStorage)
        {
            _repo = repo;
            _fileStorage = fileStorage;
        }
        public async Task<Guid?> Execute(CreateCategoryRequest categoryDto)
        {
            var imageUri = await _fileStorage.SaveImageAsync(categoryDto.Image);
            var category = new Category 
            { 
                Title = categoryDto.Title,
                Description = categoryDto.Description, 
                ImageUri = imageUri 
            };

            var id = await _repo.Add(category);
            if (id is not null)
                return id;

            return null;
        }
    }
}
