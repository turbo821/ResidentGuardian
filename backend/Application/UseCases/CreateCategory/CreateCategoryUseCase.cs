using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.UseCases.CreateCategory
{
    public class CreateCategoryUseCase : ICreateCategoryUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;

        public CreateCategoryUseCase(ICategoryRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<Guid?> Execute(CreateCategoryRequest categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            var id = await _repo.Add(category);
            if (id is not null)
                return id;

            return null;
        }
    }
}
