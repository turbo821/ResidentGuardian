namespace Application.UseCases.GetModerators
{
    public interface IGetModeratorsUseCase
    {
        Task<IEnumerable<GetModeratorsResponse>> Execute();
    }
}