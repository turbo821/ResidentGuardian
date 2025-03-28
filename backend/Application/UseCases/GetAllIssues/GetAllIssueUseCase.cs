using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetAllIssues
{
    public class GetAllIssueUseCase : IGetAllIssueUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IMapper _mapper;

        public GetAllIssueUseCase(IIssueRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<IEnumerable<GetAllIssueResponse>?> Execute()
        {
            var issues = await _repo.GetAll();
            if(!issues.Any())
                return null;

            var issuesDtos = _mapper.Map<IEnumerable<GetAllIssueResponse>>(issues);
            return issuesDtos;
        }
    }
}
