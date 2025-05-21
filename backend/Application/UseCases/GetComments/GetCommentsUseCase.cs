
using Application.Dtos;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetComments
{
    public class GetCommentsUseCase : IGetCommentsUseCase
    {
        private readonly ICommentRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);

        public GetCommentsUseCase(ICommentRepository repo, IMapper mapper, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<IEnumerable<CommentDto>?> Execute(Guid issueId)
        {
            string cacheKey = $"AllComments_{issueId}"; 
            var cachedResult = await _cache.GetAsync<IEnumerable<CommentDto>>(cacheKey);

            if (cachedResult != null)
            {
                return cachedResult;
            }

            var comments = await _repo.GetAllByIssueId(issueId);

            var commentDtos = _mapper.Map<IEnumerable<CommentDto>>(comments);

            await _cache.SetAsync(cacheKey, commentDtos, _cacheExpiration);

            return commentDtos;
        }
    }
}
