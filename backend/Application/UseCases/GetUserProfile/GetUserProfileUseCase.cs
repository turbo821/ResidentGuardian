
using Application.Dtos;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.GetUserProfile
{
    public class GetUserProfileUseCase : IGetUserProfileUseCase
    {
        private readonly UserManager<User> _userManager;

        public GetUserProfileUseCase(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UserProfileDto?> Execute(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return null;

            var roles = await _userManager.GetRolesAsync(user);

            return new UserProfileDto
            (
                user.Id,
                user.FullName,
                user.Email!,
                roles.ToList(),
                user.CreatedAt
            );
        }
    }
}
