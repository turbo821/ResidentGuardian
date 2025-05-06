
using Application.UseCases.GetUserIssues;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Models;

namespace Application.UseCases.GetModeratorIssues
{
    public class GetModeratorIssuesUseCase : IGetModeratorIssuesUseCase
    {
        private readonly IIssueRepository _repo;

        public GetModeratorIssuesUseCase(IIssueRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<GetUserIssueResponse>?> Execute(Guid moderatorId)
        {
            var moderatorIssues = await _repo.GetAllByModerator(moderatorId);

            var issuesDtos = moderatorIssues.Select(issue =>
            new GetUserIssueResponse(
                issue.Id,
                issue.Title,
                issue.Status,
                issue.CreatedAt,
                issue.Location,
                Like: issue.Grades.FirstOrDefault(g => g.UserId == moderatorId)?.Like,
                LikeCount: issue.Grades.Where(g => g.Like).Count(), DislikeCount: issue.Grades.Where(g => !g.Like).Count()
            ));

            return issuesDtos;
        }
    }
}
