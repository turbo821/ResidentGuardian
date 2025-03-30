using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Infrastructure.Data;
using Web.Configurations;
using Application.Services.Interfaces;
using Infrastructure.Auth;
using Application.Helpers;
using Application.UseCases.GetAllIssues;
using Domain.Interfaces;
using Infrastructure.Repositories;
using Application.UseCases.CreateIssue;
using Application.UseCases.GetIssue;
using Application.UseCases.UpdateIssue;
using Application.UseCases.DeleteIssue;
using Application.UseCases.GetCategories;
using Application.UseCases.CreateCategory;
using Application.UseCases.UpdateCategory;
using Application.UseCases.DeleteCategory;
using Web;


var builder = WebApplication.CreateBuilder(args);

string connection = Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? builder.Configuration.GetConnectionString("DefaultConnection")!;
var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS");

builder.Services.AddDbContext<AppGuardContext>(
    options => options.UseNpgsql(connection,
        x => x.UseNetTopologySuite())
);

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

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));

builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IIssueRepository, IssueRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAdminCliService, AdminCliService>();
builder.Services.AddScoped<RoleSetter>();

builder.Services.AddScoped<IGetCategoriesUseCase, GetCategoriesUseCase>();
builder.Services.AddScoped<ICreateCategoryUseCase, CreateCategoryUseCase>();
builder.Services.AddScoped<IUpdateCategoryUseCase, UpdateCategoryUseCase>();
builder.Services.AddScoped<IDeleteCategoryUseCase, DeleteCategoryUseCase>();

builder.Services.AddScoped<IGetAllIssueUseCase, GetAllIssueUseCase>();
builder.Services.AddScoped<IGetIssueUseCase, GetIssueUseCase>();
builder.Services.AddScoped<ICreateIssueUseCase, CreateIssueUseCase>();
builder.Services.AddScoped<IUpdateIssueUseCase, UpdateIssueUseCase>();
builder.Services.AddScoped<IDeleteIssueUseCase, DeleteIssueUseCase>();

var app = builder.Build();

// Cli mode
if (args.Length > 0 && args.Contains("create-admin") || args.Contains("create-roles"))
{
    using var scope = app.Services.CreateScope();
    if (args.Contains("create-admin"))
    {
        var adminCli = scope.ServiceProvider.GetRequiredService<IAdminCliService>();
        await adminCli.CreateAdminFromCommandLine(args);
    }
    if(args.Contains("create-roles"))
    {
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var roleSetter = scope.ServiceProvider.GetRequiredService<RoleSetter>();
        await roleSetter.Setup();
    }
    return;
}

app.UseCors("AllowClientReGuanApp");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
