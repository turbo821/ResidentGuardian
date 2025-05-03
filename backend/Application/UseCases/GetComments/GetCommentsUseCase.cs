
using Application.Dtos;
using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetComments
{
    public class GetCommentsUseCase : IGetCommentsUseCase
    {
        private readonly ICommentRepository _repo;
        private readonly IMapper _mapper;

        public GetCommentsUseCase(ICommentRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CommentDto>> Execute(Guid issueId)
        {
            var comments = await _repo.GetAllByIssueId(issueId);

            var commentDtos = _mapper.Map<IEnumerable<CommentDto>>(comments);
            return commentDtos;
        }
    }
}
