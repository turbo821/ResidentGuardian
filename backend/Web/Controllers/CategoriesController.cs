using Application.UseCases.CreateCategory;
using Application.UseCases.CreateIssue;
using Application.UseCases.DeleteCategory;
using Application.UseCases.GetCategories;
using Application.UseCases.UpdateCategory;
using Application.UseCases.UpdateIssue;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update;

namespace Web.Controllers
{
    [Route("api/caterogies")]
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


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CreateCategoryRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not valid");

            var id = await _createCaterogy.Execute(request);

            if (id is null)
                return BadRequest();

            return Ok(id);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var success = await _updateCategory.Execute(request);

            if (!success)
                return NotFound();

            return Ok();
        }

        [Authorize]
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
