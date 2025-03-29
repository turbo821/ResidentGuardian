using Application.UseCases.CreateCategory;
using Application.UseCases.DeleteCategory;
using Application.UseCases.GetCategories;
using Application.UseCases.UpdateCategory;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Web.Controllers;

namespace Tests.Controllers
{
    public class CategoriesControllerTests
    {
        private readonly CategoriesController _controller;
        private readonly Mock<ICategoryRepository> _mockCategoryRepository;
        private readonly Mock<IMapper> _mockMapper;

        public CategoriesControllerTests()
        {
            _mockCategoryRepository = new Mock<ICategoryRepository>();
            _mockMapper = new Mock<IMapper>();

            var getCategories = new GetCategoriesUseCase(_mockCategoryRepository.Object, _mockMapper.Object);
            var createCategory = new CreateCategoryUseCase(_mockCategoryRepository.Object, _mockMapper.Object); 
            var updateCategory = new UpdateCategoryUseCase(_mockCategoryRepository.Object, _mockMapper.Object);
            var deleteCategory = new DeleteCategoryUseCase(_mockCategoryRepository.Object);

            _controller = new CategoriesController(getCategories, createCategory, updateCategory, deleteCategory);
        }

        [Fact]
        public async Task GetCategories_ReturnsOk()
        {
            // Arrange
            var categories = new List<Category>
        {
            new Category { Id = Guid.NewGuid(), Name = "Road Issues", Description = "Potholes, cracks" },
            new Category { Id = Guid.NewGuid(), Name = "Garbage", Description = "Trash accumulation" }
        };
            var categoriesDtos = categories.Select(c => new GetCategoriesResponse(c.Id, c.Name, c.Description)).ToList();

            _mockCategoryRepository.Setup(repo => repo.GetAll()).ReturnsAsync(categories);
            _mockMapper.Setup(mapper => mapper.Map<IEnumerable<GetCategoriesResponse>>(categories)).Returns(categoriesDtos);

            // Act
            var result = await _controller.GetCategories();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsAssignableFrom<IEnumerable<GetCategoriesResponse>>(okResult.Value);
            Assert.Equal(2, returnValue.Count());
        }

        [Fact]
        public async Task AddCategory_ReturnsOk()
        {
            // Arrange
            var category = new Category { Id = Guid.NewGuid(), Name = "New Category", Description = "Some description" };
            var categoryDto = new CreateCategoryRequest(category.Name, category.Description);

            _mockMapper.Setup(mapper => mapper.Map<Category>(categoryDto)).Returns(category);
            _mockCategoryRepository.Setup(repo => repo.Add(category)).ReturnsAsync(category.Id);

            // Act
            var result = await _controller.AddCategory(categoryDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Guid>(okResult.Value);
            Assert.Equal(category.Id, returnValue);
        }

        [Fact]
        public async Task AddCategory_ReturnsBadRequest_WhenIdIsNull()
        {
            // Arrange
            var request = new CreateCategoryRequest("New Category", "Some description");
            _mockCategoryRepository.Setup(repo => repo.Add(It.IsAny<Category>())).ReturnsAsync((Guid?)null);

            // Act
            var result = await _controller.AddCategory(request);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task UpdateCategory_ReturnsOk()
        {
            // Arrange
            var id = Guid.NewGuid();
            var categoryDto = new UpdateCategoryRequest(id, "Updated Category", "Updated description");
            var category = new Category { Id = id, Name = "Old Category", Description = "Old description" };

            _mockMapper.Setup(mapper => mapper.Map<Category>(categoryDto)).Returns(category);
            _mockCategoryRepository.Setup(repo => repo.IsExist(category.Id)).ReturnsAsync(true);
            _mockCategoryRepository.Setup(repo => repo.Update(category)).ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateCategory(categoryDto);

            // Assert
            var okResult = Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task UpdateCategory_ReturnsNotFound()
        {
            // Arrange
            var id = Guid.NewGuid();
            var categoryDto = new UpdateCategoryRequest(id, "Updated Category", "Updated description");
            var category = new Category { Id = id, Name = "Old Category", Description = "Old description" };
            _mockMapper.Setup(mapper => mapper.Map<Category>(categoryDto)).Returns(category);
            _mockCategoryRepository.Setup(repo => repo.IsExist(id)).ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateCategory(categoryDto);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task RemoveCategory_ReturnsOk()
        {
            // Arrange
            var id = Guid.NewGuid();
            var category = new Category { Id = id, Name = "To Delete" };

            _mockCategoryRepository.Setup(repo => repo.GetById(id)).ReturnsAsync(category);
            _mockCategoryRepository.Setup(repo => repo.Delete(category)).ReturnsAsync(true);

            // Act
            var result = await _controller.RemoveCategory(id);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task RemoveCategory_ReturnsNotFound()
        {
            // Arrange
            var id = Guid.NewGuid();
            _mockCategoryRepository.Setup(repo => repo.GetById(id)).ReturnsAsync((Category?)null);

            // Act
            var result = await _controller.RemoveCategory(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
