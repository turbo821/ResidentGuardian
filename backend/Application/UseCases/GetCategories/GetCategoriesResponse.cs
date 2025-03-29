namespace Application.UseCases.GetCategories
{
    public record GetCategoriesResponse(Guid Id, string Name, string? Description);
}
