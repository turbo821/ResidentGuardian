using Application.Dtos;

namespace Application.UseCases.AddComment
{
    public interface IAddCommentUseCase
    {
        Task<CommentDto?> Execute(AddCommentRequest request);
    }
}