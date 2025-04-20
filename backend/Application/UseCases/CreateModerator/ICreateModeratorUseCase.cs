using Application.Dtos;
using Application.UseCases.GetModerators;

namespace Application.UseCases.CreateModerator
{
    public interface ICreateModeratorUseCase
    {
        Task<GetModeratorsResponse?> Execute(RegisterRequest request);
    }
}