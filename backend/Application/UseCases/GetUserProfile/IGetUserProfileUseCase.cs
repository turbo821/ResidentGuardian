using Application.Dtos;

namespace Application.UseCases.GetUserProfile
{
    public interface IGetUserProfileUseCase
    {
        Task<UserProfileDto?> Execute(Guid userId);
    }
}