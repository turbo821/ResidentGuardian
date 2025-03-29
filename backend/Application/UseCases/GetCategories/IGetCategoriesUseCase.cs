namespace Application.UseCases.GetCategories
{
    public interface IGetCategoriesUseCase
    {
        Task<IEnumerable<GetCategoriesResponse>> Execute();
    }
}
