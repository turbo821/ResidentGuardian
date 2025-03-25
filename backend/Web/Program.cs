using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Domain.Entities;
using Infrastructure.Data;
using System.Text;
using Web.Configurations;
using Application.Services.Interfaces;
using Application.Services;
using Infrastructure.Auth;


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


var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAdminCliService, AdminCliService>();
builder.Services.AddScoped<RoleSetter>();

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
