using Application.Dtos;

namespace Application.UseCases.CreateAnswer
{
    public interface ICreateAnswerUseCase
    {
        Task<AnswerDto?> Execute(CreateAnswerRequest request);  
    }
}