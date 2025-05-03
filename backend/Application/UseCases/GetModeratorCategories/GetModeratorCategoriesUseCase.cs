using AutoMapper;
using Domain.Interfaces;

namespace Application.UseCases.GetModeratorCategories
{
    public class GetModeratorCategoriesUseCase : IGetModeratorCategoriesUseCase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;

        public GetModeratorCategoriesUseCase(ICategoryRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetModeratorCategoriesResponse>?> Execute(Guid moderatorId)
        {
            var categories = await _repo.GetModeratorCategories(moderatorId);

            var categoryDtos = _mapper.Map<IEnumerable<GetModeratorCategoriesResponse>>(categories);

            return categoryDtos;


        }
    }
}
