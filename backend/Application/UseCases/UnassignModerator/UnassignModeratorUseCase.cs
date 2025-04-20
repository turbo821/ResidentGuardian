using Application.UseCases.AssignModerator;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.UnassignModerator
{
    public class UnassignModeratorUseCase : IUnassignModeratorUseCase
    {
        private readonly UserManager<User> _userManager;

        public UnassignModeratorUseCase(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> Execute(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user is null) return false;

            if (!await _userManager.IsInRoleAsync(user, "Moderator"))
                return true;

            var result = await _userManager.RemoveFromRoleAsync(user, "Moderator");

            return result.Succeeded;
        }
    }
}
