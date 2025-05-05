namespace Application.UseCases.DeleteGrade
{
    public interface IDeleteGradeUseCase
    {
        Task<bool> Execute(DeleteGradeRequest request);
    }
}