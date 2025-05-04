using Application.Filters.IssueFilters;
using Application.Services;
using Application.UseCases.AddComment;
using Application.UseCases.AddModeratorCategories;
using Application.UseCases.AssignModerator;
using Application.UseCases.CreateAnswer;
using Application.UseCases.CreateCategory;
using Application.UseCases.CreateIssue;
using Application.UseCases.CreateModerator;
using Application.UseCases.DeleteCategory;
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
using Infrastructure.Repositories;

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

            services.AddScoped<IGetModeratorsUseCase, GetModeratorsUseCase>();
            services.AddScoped<IAssignModeratorUseCase, AssignModeratorUseCase>();
            services.AddScoped<IUnassignModeratorUseCase, UnassignModeratorUseCase>();
            services.AddScoped<ICreateModeratorUseCase, CreateModeratorUseCase>();
            services.AddScoped<IAddModeratorCategoriesUseCase, AddModeratorCategoriesUseCase>();
            services.AddScoped<IDeleteModeratorUseCase, DeleteModeratorUseCase>();

            services.AddScoped<IGetUserIssuesUseCase, GetUserIssuesUseCase>();

            services.AddScoped<IGetModeratorIssuesUseCase, GetModeratorIssuesUseCase>();
            services.AddScoped<IGetModeratorCategoriesUseCase, GetModeratorCategoriesUseCase>();

            services.AddScoped<IAddCommentUseCase, AddCommentUseCase>();
            services.AddScoped<IGetCommentsUseCase, GetCommentsUseCase>();

            services.AddScoped<ICreateAnswerUseCase, CreateAnswerUseCase>();
            services.AddScoped<IGetAnswersUseCase, GetAnswersUseCase>();
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IIssueRepository, IssueRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IAnswerRepository, AnswerRepository>();
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
    }
}
