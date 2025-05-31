
using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.UpdateProfile
{
    public class UpdateUserProfileUseCase : IUpdateUserProfileUseCase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _repo;

        public UpdateUserProfileUseCase(UserManager<User> userManager, IUserRepository repo)
        {
            _userManager = userManager;
            _repo = repo;
        }

        public async Task<UserProfileDto?> Execute(Guid userId, UpdateUserProfileRequest data)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return null;

            if (!string.IsNullOrEmpty(data.CurrentPassword) && !string.IsNullOrEmpty(data.NewPassword))
            {
                await _userManager.ChangePasswordAsync(user, data.CurrentPassword, data.NewPassword);
            }

            user.Email = data.Email;
            user.NormalizedEmail = data.Email.ToUpper();
            user.NormalizedUserName = data.Email.ToUpper();
            user.UserName = data.Email;

            user.FullName = data.FullName;

            var success = await _repo.Update(user);

            if(!success) return null;

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
