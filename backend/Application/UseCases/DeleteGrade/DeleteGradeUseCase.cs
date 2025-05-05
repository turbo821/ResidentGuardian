
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.DeleteGrade
{
    public class DeleteGradeUseCase : IDeleteGradeUseCase
    {
        private readonly IGradeRepository _repo;
        private readonly IMapper _mapper;

        public DeleteGradeUseCase(IGradeRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<bool> Execute(DeleteGradeRequest request)
        {
            var grade = _mapper.Map<Grade>(request);
            if (grade == null) return false;

            return await _repo.DeleteGrade(grade);
        }
    }
}
