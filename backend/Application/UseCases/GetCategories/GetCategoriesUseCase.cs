using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetCategories
{
    public class GetCategoriesUseCase : IGetCategoriesUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;

        public GetCategoriesUseCase(ICategoryRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetCategoriesResponse>> Execute()
        {
            var categories = await _repo.GetAll();
            var categoryDtos = _mapper.Map<IEnumerable<GetCategoriesResponse>>(categories);
            return categoryDtos;
        }
    }
}
