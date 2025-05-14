using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAll();
        Task<Category?> GetById(Guid id);
        Task<Category?> GetByTitle(string title);
        Task<Guid?> Add(Category category);
        Task<bool> Update(Category category);
        Task<bool> Delete(Category category);
        Task<bool> IsExist(Guid id);

        Task<IEnumerable<Category>?> GetModeratorCategories(Guid moderatorId);
        Task<bool> UpdateModeratorCategories(Guid moderatorId, IEnumerable<Guid> categoryIds);
        Task<bool> RemoveModeratorCategories(Guid moderatorId);
    }
}
