using Application.Services.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases.DeleteCategory
{
    public class DeleteCategoryUseCase : IDeleteCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IFileStorage _fileStorage;
        private readonly ICacheService _cache;
        private const string CacheKey = "AllCategories";

        public DeleteCategoryUseCase(ICategoryRepository repo, IFileStorage fileStorage,  ICacheService cache)
        {
            _repo = repo;
            _fileStorage = fileStorage;
            _cache = cache;
        }
        public async Task<bool> Execute(Guid id)
        {
            var category = await _repo.GetById(id);

            _fileStorage.DeleteImage(category!.ImageUri);
            var success = await _repo.Delete(category!);
            if (success) await _cache.RemoveByPatternAsync(CacheKey);

            return success;
        }
    }
}
