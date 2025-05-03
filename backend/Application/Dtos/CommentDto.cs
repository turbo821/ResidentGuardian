namespace Application.Dtos
{
    public record CommentDto(Guid Id, string FullName, DateTime CreatedAt, string Text);
}
