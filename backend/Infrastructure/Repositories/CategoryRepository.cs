﻿using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CategoryRepository(AppGuardContext context) 
        : BaseRepository(context), ICategoryRepository
    {
        public async Task<IEnumerable<Category>> GetAll()
        {
            var categories = await _context.Categories
                .OrderBy(c => c.Title)
                .ToListAsync();
            return categories;
        }

        public async Task<Category?> GetById(Guid id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            return category;
        }

        public async Task<Category?> GetByTitle(string title)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Title == title);
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

        public async Task<IEnumerable<Category>?> GetModeratorCategories(Guid moderatorId)
        {
            var moderatorCategories = await _context.ModeratorCategories
                .Where(mc => mc.ModeratorId == moderatorId)
                .Select(mc => mc.Category)
                .ToListAsync();

            return moderatorCategories;
        }

        public async Task<bool> UpdateModeratorCategories(Guid moderatorId, IEnumerable<Guid> categoryIds)
        {
            var existingCategories = await _context.ModeratorCategories
                .Where(mc => mc.ModeratorId == moderatorId)
                .ToListAsync();

            _context.ModeratorCategories.RemoveRange(existingCategories);

            var newCategories = categoryIds.Select(categoryId => new ModeratorCategory
            {
                ModeratorId = moderatorId,
                CategoryId = categoryId
            });

            await _context.ModeratorCategories.AddRangeAsync(newCategories);

            return await Save();
        }

        public async Task<bool> RemoveModeratorCategories(Guid moderatorId)
        {
            var existingCategories = await _context.ModeratorCategories
                .Where(mc => mc.ModeratorId == moderatorId)
                .ToListAsync();

            if(existingCategories is null || existingCategories.Count == 0) return true;

            _context.ModeratorCategories.RemoveRange(existingCategories);

            return await Save();
        }
    }
}
