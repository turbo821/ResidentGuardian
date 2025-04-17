using Application.UseCases.GetCategories;

namespace Application.UseCases.CreateCategory
{
    public interface ICreateCategoryUseCase
    {
        Task<GetCategoriesResponse?> Execute(CreateCategoryRequest categoryDto);
    }
}
