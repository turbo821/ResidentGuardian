namespace Application.UseCases.DeleteCategory
{
    public interface IDeleteCategoryUseCase
    {
        Task<bool> Execute(Guid id);
    }
}
