namespace Application.UseCases.UpdateCategory
{
    public record UpdateCategoryRequest(Guid Id, string Name, string? Description);
}
