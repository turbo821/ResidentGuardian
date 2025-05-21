
using Application.Dtos;
using Application.Services.Interfaces;
using Domain.Interfaces;

namespace Application.UseCases.GetAnswers
{
    public class GetAnswersUseCase : IGetAnswersUseCase
    {
        private readonly IAnswerRepository _repo;
        private readonly ICacheService _cache;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(30);

        public GetAnswersUseCase(IAnswerRepository repo, ICacheService cache)
        {
            _repo = repo;
            _cache = cache;
        }

        public async Task<IEnumerable<AnswerDto>?> Execute(Guid issueId)
        {
            string cacheKey = $"AllAnswers_{issueId}";
            var cachedResult = await _cache.GetAsync<IEnumerable<AnswerDto>>(cacheKey);

            if (cachedResult != null)
            {
                return cachedResult;
            }

            var answers = await _repo.GetAllByIssueId(issueId);

            if (answers is null) return null;

            var answerDtos = answers
                .Select(answer =>
                new AnswerDto(answer.Id, answer.Moderator.FullName,
                answer.OldStatus, answer.NewStatus,
                answer.Images.Select(i => i.Uri).ToList(),
                answer.Text, answer.CreatedAt));

            await _cache.SetAsync(cacheKey, answerDtos, _cacheExpiration);

            return answerDtos;
        }
    }
}
