using Application.UseCases.GetModeratorIssues;

namespace Application.UseCases.GetModeratorCategories
{
    public interface IGetModeratorCategoriesUseCase
    {
        Task<IEnumerable<GetModeratorCategoriesResponse>?> Execute(Guid moderatorId);
    }
}