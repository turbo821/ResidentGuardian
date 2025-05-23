﻿using Application.Dtos;
using Application.Services.Interfaces;
using Application.UseCases.GetModerators;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.UseCases.CreateModerator
{
    public class CreateModeratorUseCase : ICreateModeratorUseCase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<User> _userManager;
        private readonly ICacheService _cache;
        private const string CacheKey = "AllModerators";

        public CreateModeratorUseCase(IAuthService authService, UserManager<User> userManager, ICacheService cache)
        {
            _authService = authService;
            _userManager = userManager;
            _cache = cache;
        }

        public async Task<GetModeratorsResponse?> Execute(RegisterRequest request)
        {
            var response = await _authService.RegisterModerator(request);

            if (!response.Success) return null;
            var moderator = await _userManager.FindByEmailAsync(request.Email);
            if (moderator is null) return null;

            var roles = await _userManager.GetRolesAsync(moderator);
            var moderatorDtos = new GetModeratorsResponse(
                moderator.Id,
                moderator.FullName,
                moderator.Email!,
                roles,
                moderator.ModeratorCategories.Select(mc => mc.CategoryId)
            );

            await _cache.RemoveAsync(CacheKey);
            return moderatorDtos;
        }
    }
}
