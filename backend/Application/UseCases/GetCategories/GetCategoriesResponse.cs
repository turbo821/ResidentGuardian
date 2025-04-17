namespace Application.UseCases.GetCategories
{
    public record GetCategoriesResponse(Guid Id, string Title, string Description, string ImageUri);
}
