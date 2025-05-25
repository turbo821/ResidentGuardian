using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.CookiePolicy;
using Domain.Entities;
using Application.Helpers;
using Application.Services.Interfaces;
using Infrastructure.Data;
using Infrastructure.Auth;
using Web.Configurations;
using Web.Extensions;
using Infrastructure.Background;
using Infrastructure.FileStorage;
using System.Globalization;

var cultureInfo = new CultureInfo("en-US");
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

var builder = WebApplication.CreateBuilder(args);

string connection = Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? builder.Configuration.GetConnectionString("DefaultConnection")!;
var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS");

builder.Services.AddDatabase(connection);
builder.Services.AddOneCache(builder.Configuration);

var originsArray = allowedOrigins?.Split(',', StringSplitOptions.RemoveEmptyEntries) ?? ["http://localhost:3000", "https://localhost:3000"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClientReGuanApp", policy =>
    {
        policy.WithOrigins(originsArray)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredLength = 6;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.Zero;
        options.Lockout.MaxFailedAccessAttempts = int.MaxValue;
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<AppGuardContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(nameof(JwtOptions)));
builder.Services.Configure<FileStorageOptions>(builder.Configuration.GetSection(nameof(FileStorageOptions)));

builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services.AddHostedService<TokenCleanupService>();

builder.Services.AddScoped<IAdminCliService, AdminCliService>();
builder.Services.AddScoped<RoleSetter>();

builder.Services.AddScoped<IFileStorage, LocalFileStorage>();

builder.Services.AddRepositories();
builder.Services.AddUseCases();
builder.Services.AddFilters();

var app = builder.Build();

// await app.UseAdminCliMode(args); // fix..

// await app.UseDatabaseRun();

app.UseCors("AllowClientReGuanApp");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Strict,
    HttpOnly = HttpOnlyPolicy.Always,
    Secure = CookieSecurePolicy.None,

});

app.MapStaticAssets();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/health", () => Results.Ok());
app.MapControllers();

app.Run();
