//using Domain.Entities;
//using Infrastructure.Data;
//using Infrastructure.Repositories;
//using Microsoft.EntityFrameworkCore;

//namespace Tests.Repositories
//{
//    public class IssueRepositoryTests
//    {
//        private DbContextOptions<AppGuardContext> GetDbOptions()
//        {
//            return new DbContextOptionsBuilder<AppGuardContext>()
//                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
//                .Options;
//        }

//        //[Fact]
//        //public async Task GetAll_ReturnsAllIssues()
//        //{
//        //    using var context = new AppGuardContext(GetDbOptions());
//        //    context.Issues.AddRange(new Issue { Id = Guid.NewGuid(), Title = "Title 1", Description = "Description 1" },
//        //                             new Issue { Id = Guid.NewGuid(), Title = "Title 2", Description = "Description 2" });
//        //    await context.SaveChangesAsync();

//        //    var repository = new IssueRepository(context);
//        //    var issues = await repository.GetAll();

//        //    Assert.Equal(2, issues.Count());
//        //}

//        //[Fact]
//        //public async Task GetById_ReturnsIssue_WhenExists()
//        //{
//        //    using var context = new AppGuardContext(GetDbOptions());
//        //    var issue = new Issue { Id = Guid.NewGuid(), Title = "Title", Description = "Description" };
//        //    context.Issues.Add(issue);
//        //    await context.SaveChangesAsync();

//        //    var repository = new IssueRepository(context);
//        //    var result = await repository.GetById(issue.Id);

//        //    Assert.NotNull(result);
//        //    Assert.Equal(issue.Id, result.Id);
//        //}

//        //[Fact]
//        //public async Task GetById_ReturnsNull_WhenNotExists()
//        //{
//        //    using var context = new AppGuardContext(GetDbOptions());
//        //    var repository = new IssueRepository(context);
//        //    var result = await repository.GetById(Guid.NewGuid());

//        //    Assert.Null(result);
//        //}

//        //[Fact]
//        //public async Task Add_ReturnsId()
//        //{
//        //    using var context = new AppGuardContext(GetDbOptions());
//        //    var repository = new IssueRepository(context);
//        //    var issue = new Issue { Id = Guid.NewGuid(), Title = "New Title", Description = "New Description" };

//        //    var result = await repository.Add(issue);

//        //    Assert.NotNull(result);
//        //    Assert.Equal(issue.Id, result);
//        //}

//        //[Fact]
//        //public async Task Add_ReturnsNull_WhenSaveFails()
//        //{
//        //    // Arrange
//        //    using var context = new AppGuardContext(GetDbOptions());
//        //    var repository = new IssueRepository(context);

//        //    // Act
//        //    var result = await repository.Add(null!);

//        //    // Assert
//        //    Assert.Null(result);
//        //}

//        [Fact]
//        public async Task Update_ReturnsTrue_WhenUpdated()
//        {
//            using var context = new AppGuardContext(GetDbOptions());
//            var issue = new Issue { Id = Guid.NewGuid(), Title = "Old Title", Description = "Old Description" };
//            context.Issues.Add(issue);
//            await context.SaveChangesAsync();

//            var repository = new IssueRepository(context);
//            issue.Title = "Updated problem";
//            var result = await repository.Update(issue);

//            Assert.True(result);
//            Assert.Equal("Updated problem", (await repository.GetById(issue.Id))!.Title);
//            Assert.Equal("Old Description", (await repository.GetById(issue.Id))!.Description);
//        }

//        [Fact]
//        public async Task Update_ReturnsFalse_WhenCategoryNotFound()
//        {
//            // Arrange
//            using var context = new AppGuardContext(GetDbOptions());
//            var repository = new IssueRepository(context);
//            var issue = new Issue { Id = Guid.NewGuid(), Title = "Non-Existent", Description = "Will not be found" };

//            // Act
//            var result = await repository.Update(issue);

//            // Assert
//            Assert.False(result);
//        }

//        [Fact]
//        public async Task Delete_ReturnsTrue_WhenSuccessful()
//        {
//            using var context = new AppGuardContext(GetDbOptions());
//            var issue = new Issue { Id = Guid.NewGuid(), Title = "Deleting Issue", Description = "Description" };
//            context.Issues.Add(issue);
//            await context.SaveChangesAsync();

//            var repository = new IssueRepository(context);
//            var result = await repository.Delete(issue);

//            Assert.True(result);
//            Assert.Null(await repository.GetById(issue.Id));
//        }

//        [Fact]
//        public async Task DeleteCategory_ReturnsFalse_WhenCategoryNotFound()
//        {
//            // Arrange
//            using var context = new AppGuardContext(GetDbOptions());
//            var repository = new IssueRepository(context);

//            var issue = new Issue { Id = Guid.NewGuid(), Title = "Non-Existent", Description = "Will not be found" };

//            // Act
//            var result = await repository.Delete(issue);

//            // Assert
//            Assert.False(result);
//        }

//        [Fact]
//        public async Task IsExist_ReturnsTrue_WhenExists()
//        {
//            using var context = new AppGuardContext(GetDbOptions());
//            var issue = new Issue { Id = Guid.NewGuid(), Title = "Existing problem", Description = "Description" };
//            context.Issues.Add(issue);
//            await context.SaveChangesAsync();

//            var repository = new IssueRepository(context);
//            var result = await repository.IsExist(issue.Id);

//            Assert.True(result);
//        }

//        [Fact]
//        public async Task IsExist_ReturnsFalse_WhenNotExists()
//        {
//            using var context = new AppGuardContext(GetDbOptions());
//            var repository = new IssueRepository(context);
//            var result = await repository.IsExist(Guid.NewGuid());

//            Assert.False(result);
//        }
//    }

//}
