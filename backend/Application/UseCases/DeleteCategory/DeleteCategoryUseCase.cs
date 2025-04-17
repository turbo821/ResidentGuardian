using Application.Services.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases.DeleteCategory
{
    public class DeleteCategoryUseCase : IDeleteCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IFileStorage _fileStorage;

        public DeleteCategoryUseCase(ICategoryRepository repo, IFileStorage fileStorage)
        {
            _repo = repo;
            _fileStorage = fileStorage;
        }
        public async Task<bool> Execute(Guid id)
        {
            var category = await _repo.GetById(id);

            _fileStorage.DeleteImage(category!.ImageUri);
            var success = await _repo.Delete(category!);

            return success;
        }
    }
}
