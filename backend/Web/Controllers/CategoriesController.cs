using Application.UseCases.CreateCategory;
using Application.UseCases.DeleteCategory;
using Application.UseCases.GetCategories;
using Application.UseCases.UpdateCategory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IGetCategoriesUseCase _getCategories;
        private readonly ICreateCategoryUseCase _createCaterogy;
        private readonly IUpdateCategoryUseCase _updateCategory;
        private readonly IDeleteCategoryUseCase _deleteCategory;

        public CategoriesController(IGetCategoriesUseCase getCategories, ICreateCategoryUseCase createCaterogy,
            IUpdateCategoryUseCase updateCategory, IDeleteCategoryUseCase deleteCategory)
        {
            _getCategories = getCategories;
            _createCaterogy = createCaterogy;
            _updateCategory = updateCategory;
            _deleteCategory = deleteCategory;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var response = await _getCategories.Execute();

            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromForm] CreateCategoryRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not valid");

            var category = await _createCaterogy.Execute(request);

            if (category is null)
                return BadRequest();

            return Ok(category);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromForm] UpdateCategoryRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var category = await _updateCategory.Execute(request);

            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveCategory(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var success = await _deleteCategory.Execute(id);

            if (!success)
                return NotFound();

            return Ok();
        }
    }
}
