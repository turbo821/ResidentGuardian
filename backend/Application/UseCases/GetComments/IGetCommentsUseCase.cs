using Application.Dtos;

namespace Application.UseCases.GetComments
{
    public interface IGetCommentsUseCase
    {
        Task<IEnumerable<CommentDto>> Execute(Guid issueId);
    }
}