using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAll();
        Task<Category?> GetById(Guid id);
        Task<Guid?> Add(Category category);
        Task<bool> Update(Category category);
        Task<bool> Delete(Category category);
        Task<bool> IsExist(Guid id);

        Task<bool> AddModeratorCategories(Guid moderatorId, IEnumerable<Guid> categoryIds);
        Task<bool> RemoveModeratorCategories(Guid moderatorId);
    }
}
