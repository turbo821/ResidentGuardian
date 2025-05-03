using Application.Dtos;

namespace Application.UseCases.GetAnswers
{
    public interface IGetAnswersUseCase
    {
        Task<IEnumerable<AnswerDto>?> Execute(Guid issueId);
    }
}