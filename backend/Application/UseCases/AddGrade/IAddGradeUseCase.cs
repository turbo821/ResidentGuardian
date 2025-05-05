namespace Application.UseCases.AddGrade
{
    public interface IAddGradeUseCase
    {
        Task<bool> Execute(AddGradeRequest request);
    }
}