namespace Application.UseCases.DeleteComment
{
    public interface IDeleteCommentUseCase
    {
        Task<bool> Execute(Guid commentId, Guid userId);
    }
}