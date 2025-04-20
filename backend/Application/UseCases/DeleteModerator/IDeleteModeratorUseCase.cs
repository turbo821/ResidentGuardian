namespace Application.UseCases.DeleteModerator
{
    public interface IDeleteModeratorUseCase
    {
        Task<bool> Execute(Guid id);
    }
}