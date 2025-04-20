using Application.UseCases.GetModerators;

namespace Application.UseCases.AssignModerator
{
    public interface IAssignModeratorUseCase
    {
        Task<GetModeratorsResponse?> Execute(AssignModeratorRequest email);
    }
}