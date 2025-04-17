using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppGuardContext _context;

        public CategoryRepository(AppGuardContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Category>> GetAll()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories;
        }

        public async Task<Category?> GetById(Guid id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            return category;
        }

        public async Task<Guid?> Add(Category category)
        {
            if(category == null)
                return null;

            await _context.Categories.AddAsync(category);
            if (await Save())
                return category.Id;
            return null;
        }

        public async Task<bool> Update(Category category)
        {
            Category? oldCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == category.Id);
            if (oldCategory == null)
                return false;

            oldCategory.Title = category.Title;
            oldCategory.Description = category.Description;
            oldCategory.ImageUri = category.ImageUri;

            return await Save();
        }

        public async Task<bool> Delete(Category category)
        {
            if (!await IsExist(category.Id))
                return false;

            _context.Categories.Remove(category);

            return await Save();

        }

        public Task<bool> IsExist(Guid id)
        {
            return _context.Categories.AnyAsync(x => x.Id == id);
        }

        private async Task<bool> Save()
        {
            var saved = await _context.SaveChangesAsync();
            return saved > 0 ? true : false;
        }
    }
}
