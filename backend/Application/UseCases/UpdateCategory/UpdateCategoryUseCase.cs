using Application.Services.Interfaces;
using Application.UseCases.UpdateIssue;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.UpdateCategory
{
    public class UpdateCategoryUseCase : IUpdateCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IFileStorage _fileStorage;

        public UpdateCategoryUseCase(ICategoryRepository repo, IFileStorage fileStorage)
        {
            _repo = repo;
            _fileStorage = fileStorage;
        }

        public async Task<bool> Execute(UpdateCategoryRequest categoryDto)
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
            return success;
        }
    }
}
