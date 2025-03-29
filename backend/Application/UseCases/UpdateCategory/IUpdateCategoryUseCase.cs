namespace Application.UseCases.UpdateCategory
{
    public interface IUpdateCategoryUseCase
    {
        Task<bool> Execute(UpdateCategoryRequest categoryDto);
    }
}
