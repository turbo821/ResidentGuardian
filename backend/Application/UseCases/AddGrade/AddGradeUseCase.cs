
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.AddGrade
{
    public class AddGradeUseCase : IAddGradeUseCase
    {
        private readonly IGradeRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICacheService _cache;
        private const string AllIssuesKey = "AllIssues";

        public AddGradeUseCase(IGradeRepository repo, IMapper mapper, ICacheService cache)
        {
            _repo = repo;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<bool> Execute(AddGradeRequest request)
        {
            var grade = _mapper.Map<Grade>(request);
            if (grade == null) return false;

            string cacheKey = $"Issue_{request.IssueId}";
            await _cache.RemoveAsync(cacheKey);
            await _cache.RemoveByPatternAsync(AllIssuesKey);

            return await _repo.AddGrade(grade);
        }
    }
}
