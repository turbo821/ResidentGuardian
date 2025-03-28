using Application.Dtos;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.DeleteIssue
{
    public class DeleteIssueUseCase : IDeleteIssueUseCase
    {
        private readonly IIssueRepository _repo;

        public DeleteIssueUseCase(IIssueRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Execute(Guid id)
        {
            var issue = await _repo.GetById(id);

            if (issue is null)
                return false;

            var success = await _repo.Delete(issue);

            return success;
        }
    }
}
