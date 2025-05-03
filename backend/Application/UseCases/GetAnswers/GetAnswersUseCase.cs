
using Application.Dtos;
using Domain.Interfaces;

namespace Application.UseCases.GetAnswers
{
    public class GetAnswersUseCase : IGetAnswersUseCase
    {
        private readonly IAnswerRepository _repo;

        public GetAnswersUseCase(IAnswerRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<AnswerDto>?> Execute(Guid issueId)
        {
            var answers = await _repo.GetAllByIssueId(issueId);

            if (answers is null) return null;

            var answerDtos = answers
                .Select(answer =>
                new AnswerDto(answer.Id, answer.Moderator.FullName,
                answer.OldStatus, answer.NewStatus,
                answer.Images.Select(i => i.Uri).ToList(),
                answer.Text, answer.CreatedAt));

            return answerDtos;
        }
    }
}
