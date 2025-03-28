using Application.Dtos;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateIssue
{
    public class CreateIssueUseCase : ICreateIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IMapper _mapper;

        public CreateIssueUseCase(IIssueRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<Guid?> Execute(CreateIssueRequest issueDto)
        {
            var issue = _mapper.Map<Issue>(issueDto);
            var id = await _repo.Add(issue);
            if (id is not null)
                return id;

            return null;
        }
    }
}
