using Application.UseCases.CreateIssue;
using Application.UseCases.GetAllIssues;
using Application.UseCases.GetIssue;
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
        }
    }
}
