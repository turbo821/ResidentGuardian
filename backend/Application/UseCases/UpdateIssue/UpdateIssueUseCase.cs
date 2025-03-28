using Application.Dtos;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.UpdateIssue
{
    public class UpdateIssueUseCase : IUpdateIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IMapper _mapper;

        public UpdateIssueUseCase(IIssueRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<bool> Execute(UpdateIssueRequest issueDto)
        {
            var issue = _mapper.Map<Issue>(issueDto);

            if(await _repo.IsExist(issueDto.Id))
            {
                var success = await _repo.Update(issue);
                return success;
            }
            return false;
        }
    }
}
