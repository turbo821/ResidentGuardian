using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Polly;
using Web.Configurations;

namespace Web.Extensions
{
    public static class DatabaseExtensions
    {
        public static void AddDatabase(this IServiceCollection services, string connection)
        {
                services.AddDbContext<AppGuardContext>(
                    options => options.UseNpgsql(connection, x =>
                    {
                        x.UseNetTopologySuite();
                        x.EnableRetryOnFailure(
                            maxRetryCount: 5,
                            maxRetryDelay: TimeSpan.FromSeconds(30),
                            errorCodesToAdd: null);
                    }));
        }

        public static async Task UseDatabaseRun(this WebApplication app)
        { 
            var retryPolicy = Policy
                .Handle<Exception>()
                .WaitAndRetryAsync(
                    retryCount: 5,
                    sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                    onRetry: (exception, retryCount, context) =>
                    {
                        Console.WriteLine($"Retry {retryCount} of initializing database roles...");
                    });

            await retryPolicy.ExecuteAsync(async () =>
            {
                using (var scope = app.Services.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<AppGuardContext>();
                    await dbContext.Database.MigrateAsync();

                    var roleSetter = scope.ServiceProvider.GetRequiredService<RoleSetter>();
                    await roleSetter.Setup();
                }
            });
        }
    }
}
