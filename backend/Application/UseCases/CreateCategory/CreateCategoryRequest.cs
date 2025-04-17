using Microsoft.AspNetCore.Http;

namespace Application.UseCases.CreateCategory
{
    public record CreateCategoryRequest(string Title, string Description, IFormFile Image);
}
