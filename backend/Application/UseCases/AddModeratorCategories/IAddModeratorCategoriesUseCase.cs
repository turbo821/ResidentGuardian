using Application.UseCases.AddModeratorRoles;
using Application.UseCases.GetModerators;

namespace Application.UseCases.AddModeratorCategories
{
    public interface IAddModeratorCategoriesUseCase
    {
        Task<GetModeratorsResponse?> Execute(AddModeratorCategoriesRequest request);
    }
}