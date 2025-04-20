namespace Application.UseCases.UnassignModerator
{
    public interface IUnassignModeratorUseCase
    {
        Task<bool> Execute(Guid request);
    }
}