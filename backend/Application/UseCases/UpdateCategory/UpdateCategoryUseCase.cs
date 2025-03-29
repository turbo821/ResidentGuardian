using Application.UseCases.UpdateIssue;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.UpdateCategory
{
    public class UpdateCategoryUseCase : IUpdateCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;

        public UpdateCategoryUseCase(ICategoryRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<bool> Execute(UpdateCategoryRequest categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);

            var success = await _repo.Update(category);
            return success;
        }
    }
}
