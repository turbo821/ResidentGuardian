namespace Application.UseCases.CreateCategory
{
    public interface ICreateCategoryUseCase
    {
        Task<Guid?> Execute(CreateCategoryRequest categoryDto);
    }
}
