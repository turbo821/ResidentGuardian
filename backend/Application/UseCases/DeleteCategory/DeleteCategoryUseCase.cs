using Domain.Interfaces;

namespace Application.UseCases.DeleteCategory
{
    public class DeleteCategoryUseCase : IDeleteCategoryUseCase
    {
        private readonly ICategoryRepository _repo;

        public DeleteCategoryUseCase(ICategoryRepository repo)
        {
            _repo = repo;
        }
        public async Task<bool> Execute(Guid id)
        {
            var category = await _repo.GetById(id);
            var success = await _repo.Delete(category!);

            return success;
        }
    }
}
