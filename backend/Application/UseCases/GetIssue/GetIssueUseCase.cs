using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetIssue
{
    public class GetIssueUseCase : IGetIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IMapper _mapper;

        public GetIssueUseCase(IIssueRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<GetIssueResponse?> Execute(Guid id)
        {
            var issue = await _repo.GetById(id);
            var issueDto = _mapper.Map<GetIssueResponse?>(issue);
            return issueDto;
        }
    }
}
