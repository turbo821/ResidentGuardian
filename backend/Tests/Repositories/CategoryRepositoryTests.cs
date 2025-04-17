using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Tests.Repositories
{
    public class CategoryRepositoryTests
    {
        private DbContextOptions<AppGuardContext> GetDbOptions()
        {
            return new DbContextOptionsBuilder<AppGuardContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
        }

        [Fact]
        public async Task GetAll_ReturnsAllCategories()
        {
            // Arrange
            using var context = new AppGuardContext(GetDbOptions());
            context.Categories.AddRange(
                new Category { Id = Guid.NewGuid(), Title = "Road Issues", Description = "Potholes and cracks" },
                new Category { Id = Guid.NewGuid(), Title = "Garbage", Description = "Trash accumulation" }
            );
            await context.SaveChangesAsync();

            // Act
            var repository = new CategoryRepository(context);
            var result = await repository.GetAll();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetById_ReturnsCorrectCategory()
        {
            // Arrange
            var categoryId = Guid.NewGuid();
            using var context = new AppGuardContext(GetDbOptions());
            context.Categories.Add(new Category { Id = categoryId, Title = "Test Category", Description = "Test description" });
            await context.SaveChangesAsync();

            // Act
            var repository = new CategoryRepository(context);
            var result = await repository.GetById(categoryId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(categoryId, result!.Id);
        }

        [Fact]
        public async Task GetById_ReturnsNull_WhenCategoryNotFound()
        {
            // Arrange
            using var context = new AppGuardContext(GetDbOptions());
            var repository = new CategoryRepository(context);

            // Act
            var result = await repository.GetById(Guid.NewGuid());

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task AddCategory_ReturnsCategoryId()
        {
            // Arrange
            var category = new Category { Id = Guid.NewGuid(), Title = "New Category", Description = "Description" };
            using var context = new AppGuardContext(GetDbOptions());
            var repository = new CategoryRepository(context);

            // Act
            var result = await repository.Add(category);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(category.Id, result);
        }

        [Fact]
        public async Task AddCategory_ReturnsNull_WhenSaveFails()
        {
            // Arrange
            using var context = new AppGuardContext(GetDbOptions());
            var repository = new CategoryRepository(context);

            // Act
            var result = await repository.Add(null!);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateCategory_ReturnsTrue_WhenUpdated()
        {
            // Arrange
            var categoryId = Guid.NewGuid();
            using var context = new AppGuardContext(GetDbOptions());
            context.Categories.Add(new Category { Id = categoryId, Title = "Old Name", Description = "Old Description" });
            await context.SaveChangesAsync();
           
            // Act
            var repository = new CategoryRepository(context);
            var category = await repository.GetById(categoryId);
            category!.Title = "Updated Name";

            var result = await repository.Update(category);

            // Assert
            Assert.True(result);
            Assert.Equal("Old Description", category.Description);
            Assert.Equal("Updated Name", category.Title);
        }

        [Fact]
        public async Task UpdateCategory_ReturnsFalse_WhenCategoryNotFound()
        {
            // Arrange
            using var context = new AppGuardContext(GetDbOptions());
            var repository = new CategoryRepository(context);
            var category = new Category { Id = Guid.NewGuid(), Title = "Non-Existent", Description = "Will not be found" };

            // Act
            var result = await repository.Update(category);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task DeleteCategory_ReturnsTrue_WhenDeleted()
        {
            // Arrange
            var categoryId = Guid.NewGuid();
            using var context = new AppGuardContext(GetDbOptions());
            var category = new Category { Id = categoryId, Title = "To Delete", Description = "Description" };
            context.Categories.Add(category);
            await context.SaveChangesAsync();

            // Act
            var repository = new CategoryRepository(context);
            var categoryDb = await repository.GetById(categoryId);

            var result = await repository.Delete(categoryDb!);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task DeleteCategory_ReturnsFalse_WhenCategoryNotFound()
        {
            // Arrange
            using var context = new AppGuardContext(GetDbOptions());
            var repository = new CategoryRepository(context);

            var category = new Category { Id = Guid.NewGuid(), Title = "Non-Existent", Description = "Will not be found" };

            // Act
            var result = await repository.Delete(category);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task IsExist_ReturnsTrue_WhenCategoryExists()
        {
            // Arrange
            var categoryId = Guid.NewGuid();
            using var context = new AppGuardContext(GetDbOptions());
            context.Categories.Add(new Category { Id = categoryId, Title = " Existing Category", Description = "Exists" });
            await context.SaveChangesAsync();

            // Act
            var repository = new CategoryRepository(context);
            var result = await repository.IsExist(categoryId);

            // Assert
            Assert.True(result);
            
        }

        [Fact]
        public async Task IsExist_ReturnsFalse_WhenCategoryDoesNotExist()
        {
            // Arrange
            using var context = new AppGuardContext(GetDbOptions());
            var repository = new CategoryRepository(context);

            // Act
            var result = await repository.IsExist(Guid.NewGuid());

            // Assert
            Assert.False(result);
        }
    }
}
