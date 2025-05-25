using Application.Filters.IssueFilters;
using Application.Services;
using Application.Services.Interfaces;
using Application.UseCases.AddComment;
using Application.UseCases.AddGrade;
using Application.UseCases.UpdateModeratorCategories;
using Application.UseCases.AssignModerator;
using Application.UseCases.CreateAnswer;
using Application.UseCases.CreateCategory;
using Application.UseCases.CreateIssue;
using Application.UseCases.CreateModerator;
using Application.UseCases.DeleteCategory;
using Application.UseCases.DeleteGrade;
using Application.UseCases.DeleteIssue;
using Application.UseCases.DeleteModerator;
using Application.UseCases.GetAllIssues;
using Application.UseCases.GetAnswers;
using Application.UseCases.GetCategories;
using Application.UseCases.GetComments;
using Application.UseCases.GetIssue;
using Application.UseCases.GetModeratorCategories;
using Application.UseCases.GetModeratorIssues;
using Application.UseCases.GetModerators;
using Application.UseCases.GetUserIssues;
using Application.UseCases.UnassignModerator;
using Application.UseCases.UpdateCategory;
using Application.UseCases.UpdateIssue;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Cache;
using Infrastructure.Repositories;
using StackExchange.Redis;
using Application.UseCases.RestoreIssue;
using Application.UseCases.DeleteComment;
using System.Text.Json;

namespace Web.Extensions
{
    public static class DIExtensions
    {
        public static void AddUseCases(this IServiceCollection services)
        {
            services.AddScoped<IGetCategoriesUseCase, GetCategoriesUseCase>();
            services.AddScoped<ICreateCategoryUseCase, CreateCategoryUseCase>();
            services.AddScoped<IUpdateCategoryUseCase, UpdateCategoryUseCase>();
            services.AddScoped<IDeleteCategoryUseCase, DeleteCategoryUseCase>();

            services.AddScoped<IGetAllIssueUseCase, GetAllIssueUseCase>();
            services.AddScoped<IGetIssueUseCase, GetIssueUseCase>();
            services.AddScoped<ICreateIssueUseCase, CreateIssueUseCase>();
            services.AddScoped<IUpdateIssueUseCase, UpdateIssueUseCase>();
            services.AddScoped<IDeleteIssueUseCase, DeleteIssueUseCase>();
            services.AddScoped<IRestoreIssueUseCase, RestoreIssueUseCase>();

            services.AddScoped<IGetModeratorsUseCase, GetModeratorsUseCase>();
            services.AddScoped<IAssignModeratorUseCase, AssignModeratorUseCase>();
            services.AddScoped<IUnassignModeratorUseCase, UnassignModeratorUseCase>();
            services.AddScoped<ICreateModeratorUseCase, CreateModeratorUseCase>();
            services.AddScoped<IUpdateModeratorCategoriesUseCase, UpdateModeratorCategoriesUseCase>();
            services.AddScoped<IDeleteModeratorUseCase, DeleteModeratorUseCase>();

            services.AddScoped<IGetUserIssuesUseCase, GetUserIssuesUseCase>();

            services.AddScoped<IGetModeratorIssuesUseCase, GetModeratorIssuesUseCase>();
            services.AddScoped<IGetModeratorCategoriesUseCase, GetModeratorCategoriesUseCase>();

            services.AddScoped<IAddCommentUseCase, AddCommentUseCase>();
            services.AddScoped<IGetCommentsUseCase, GetCommentsUseCase>();
            services.AddScoped<IDeleteCommentUseCase, DeleteCommentUseCase>();

            services.AddScoped<ICreateAnswerUseCase, CreateAnswerUseCase>();
            services.AddScoped<IGetAnswersUseCase, GetAnswersUseCase>();

            services.AddScoped<IAddGradeUseCase, AddGradeUseCase>();
            services.AddScoped<IDeleteGradeUseCase, DeleteGradeUseCase>();
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IIssueRepository, IssueRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IAnswerRepository, AnswerRepository>();
            services.AddScoped<IGradeRepository, GradeRepository>();
        }

        public static void AddFilters(this IServiceCollection services)
        {
            services.AddScoped<ISort<Issue>, IssueSortService>();

            services.AddScoped<IFilter<Issue>, CategoryFilter>();
            services.AddScoped<IFilter<Issue>, StatusFilter>();
            services.AddScoped<IFilter<Issue>, TimeRangeFilter>();
            services.AddScoped<IFilter<Issue>, SearchFilter>();

            services.AddScoped<IPagination<Issue>, IssuePaginationService>();
        }

        public static IServiceCollection AddOneCache(this IServiceCollection services, IConfiguration configuration)
        {
            var redisAvailable = false;

            var redisHost = Environment.GetEnvironmentVariable("REDIS_HOST") ?? configuration.GetSection("Redis:ConnectionString").Value!;

            try
            {
                var redis = ConnectionMultiplexer.Connect(redisHost);
                if (redis.IsConnected)
                {
                    var jsonOptions = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true,
                        IncludeFields = true,
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                    };

                    services.AddSingleton(jsonOptions);
                    services.AddSingleton<IConnectionMultiplexer>(redis);
                    services.AddSingleton<ICacheService, DistributedCacheService>();
                    redisAvailable = true;
                }
            }
            catch { }

            if (!redisAvailable)
            {
                services.AddMemoryCache();
                services.AddSingleton<ICacheService, MemoryCacheService>();
            }

            return services;
        }
    }
}
