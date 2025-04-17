using Microsoft.AspNetCore.Http;

namespace Application.UseCases.UpdateCategory
{
    public record UpdateCategoryRequest(Guid Id, string Title, string Description, IFormFile? Image);
}
