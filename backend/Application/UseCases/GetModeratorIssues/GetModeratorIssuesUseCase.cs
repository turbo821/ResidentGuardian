
using Application.UseCases.GetUserIssues;
using AutoMapper;
using Domain.Interfaces;
using Domain.Models;

namespace Application.UseCases.GetModeratorIssues
{
    public class GetModeratorIssuesUseCase : IGetModeratorIssuesUseCase
    {
        private readonly IIssueRepository _repo;
        private readonly IMapper _mapper;

        public GetModeratorIssuesUseCase(IIssueRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid moderatorId)
        {
            var moderatorIssues = await _repo.GetAllByModerator(moderatorId);

            var issuesDtos = _mapper.Map<IEnumerable<GetUserIssueResponse>>(moderatorIssues);

            return issuesDtos;
        }
    }
}
