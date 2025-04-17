using Application.UseCases.GetCategories;
using Domain.Entities;

namespace Application.UseCases.UpdateCategory
{
    public interface IUpdateCategoryUseCase
    {
        Task<GetCategoriesResponse?> Execute(UpdateCategoryRequest categoryDto);
    }
}
