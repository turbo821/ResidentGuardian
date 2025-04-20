using Application.UseCases.CreateCategory;
using Application.UseCases.CreateIssue;
using Application.UseCases.GetAllIssues;
using Application.UseCases.GetCategories;
using Application.UseCases.GetIssue;
using Application.UseCases.GetModerators;
using Application.UseCases.UpdateCategory;
using Application.UseCases.UpdateIssue;
using AutoMapper;
using Domain.Entities;

namespace Application.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Issue, GetAllIssueResponse>();
            CreateMap<Issue, GetIssueResponse>();

            CreateMap<CreateIssueRequest, Issue>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid()));
            CreateMap<UpdateIssueRequest, Issue>();

            CreateMap<Category, GetCategoriesResponse>();
            CreateMap<CreateCategoryRequest, Category>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid()));
            CreateMap<UpdateCategoryRequest, Category>();
        }
    }
}
