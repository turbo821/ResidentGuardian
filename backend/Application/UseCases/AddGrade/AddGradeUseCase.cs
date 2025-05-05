
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.AddGrade
{
    public class AddGradeUseCase : IAddGradeUseCase
    {
        private readonly IGradeRepository _repo;
        private readonly IMapper _mapper;

        public AddGradeUseCase(IGradeRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<bool> Execute(AddGradeRequest request)
        {
            var grade = _mapper.Map<Grade>(request);
            if (grade == null) return false;

            return await _repo.AddGrade(grade);
        }
    }
}
