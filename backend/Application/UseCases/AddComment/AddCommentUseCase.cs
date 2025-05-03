
using Application.Dtos;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.AddComment
{
    public class AddCommentUseCase : IAddCommentUseCase
    {
        private readonly ICommentRepository _repo;
        private readonly IMapper _mapper;

        public AddCommentUseCase(ICommentRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<CommentDto?> Execute(AddCommentRequest request)
        {
            var comment = _mapper.Map<Comment>(request);

            var newComment = await _repo.AddComment(comment);
            if (newComment is null) return null;

            var commentDto = _mapper.Map<CommentDto>(newComment);
            return commentDto;
        }
    }
}
