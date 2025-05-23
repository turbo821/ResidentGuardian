
using Application.Dtos;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.AddComment
{
    public class AddCommentUseCase : IAddCommentUseCase
    {
        private readonly ICommentRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICacheService _cache;

        public AddCommentUseCase(ICommentRepository repo, IMapper mapper, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<CommentDto?> Execute(AddCommentRequest request)
        {
            var comment = _mapper.Map<Comment>(request);

            var newComment = await _repo.Add(comment);
            if (newComment is null) return null;

            var commentDto = _mapper.Map<CommentDto>(newComment);

            string cacheKey = $"AllComments_{request.IssueId}";
            await _cache.RemoveAsync(cacheKey);

            return commentDto;
        }
    }
}
