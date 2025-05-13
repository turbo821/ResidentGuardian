using Application.UseCases.AddModeratorRoles;
using Application.UseCases.GetModerators;

namespace Application.UseCases.UpdateModeratorCategories
{
    public interface IUpdateModeratorCategoriesUseCase
    {
        Task<GetModeratorsResponse?> Execute(UpdateModeratorCategoriesRequest request);
    }
}