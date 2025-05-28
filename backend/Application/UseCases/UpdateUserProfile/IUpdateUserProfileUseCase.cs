using Application.Dtos;

namespace Application.UseCases.UpdateProfile
{
    public interface IUpdateUserProfileUseCase
    {
        Task<UserProfileDto?> Execute(Guid userId, UpdateUserProfileRequest data);
    }
}