using Application.Dtos;
using Application.UseCases.AddComment;
using Application.UseCases.AddGrade;
using Application.UseCases.CreateCategory;
using Application.UseCases.CreateIssue;
using Application.UseCases.DeleteGrade;
using Application.UseCases.GetCategories;
using Application.UseCases.GetModeratorCategories;
using Application.UseCases.GetUserIssues;
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
            CreateMap<CreateIssueRequest, Issue>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid()));
            CreateMap<UpdateIssueRequest, Issue>();

            CreateMap<Category, GetCategoriesResponse>();
            CreateMap<CreateCategoryRequest, Category>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid()));
            CreateMap<UpdateCategoryRequest, Category>();

            CreateMap<Issue, GetUserIssueResponse>();
            CreateMap<Category, GetModeratorCategoriesResponse>();

            CreateMap<AddCommentRequest, Comment>();
            CreateMap<Comment, CommentDto>()
                .ForCtorParam(nameof(CommentDto.FullName), opt => opt.MapFrom(src => src.User.FullName));

            CreateMap<AddGradeRequest, Grade>();
            CreateMap<DeleteGradeRequest, Grade>();
        }
    }
}
