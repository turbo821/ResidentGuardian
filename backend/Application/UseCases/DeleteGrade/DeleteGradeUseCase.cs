
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.DeleteGrade
{
    public class DeleteGradeUseCase : IDeleteGradeUseCase
    {
        private readonly IGradeRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICacheService _cache;
        private const string AllIssuesKey = "AllIssues";

        public DeleteGradeUseCase(IGradeRepository repo, IMapper mapper, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<bool> Execute(DeleteGradeRequest request)
        {
            var grade = _mapper.Map<Grade>(request);
            if (grade == null) return false;

            string cacheKey = $"Issue_{request.IssueId}";
            await _cache.RemoveAsync(cacheKey);
            await _cache.RemoveByPatternAsync(AllIssuesKey);

            return await _repo.DeleteGrade(grade);
        }
    }
}
