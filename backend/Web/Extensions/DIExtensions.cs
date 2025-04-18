﻿using Application.UseCases.CreateCategory;
using Application.UseCases.CreateIssue;
using Application.UseCases.DeleteCategory;
using Application.UseCases.DeleteIssue;
using Application.UseCases.GetAllIssues;
using Application.UseCases.GetCategories;
using Application.UseCases.GetIssue;
using Application.UseCases.UpdateCategory;
using Application.UseCases.UpdateIssue;
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
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IIssueRepository, IssueRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
        }
    }
}
