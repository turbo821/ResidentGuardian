﻿using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.Background
{
    public class TokenCleanupService : BackgroundService
    {
        private readonly IServiceProvider _services;
        private readonly TimeSpan _cleanupInterval = TimeSpan.FromHours(6);

        public TokenCleanupService(IServiceProvider services)
        {
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _services.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<AppGuardContext>();

                    await dbContext.RefreshTokens
                        .Where(rt => rt.Expires < DateTime.UtcNow)
                        .ExecuteDeleteAsync(stoppingToken);
                }
                await Task.Delay(_cleanupInterval, stoppingToken);
            }
        }
    }
}
