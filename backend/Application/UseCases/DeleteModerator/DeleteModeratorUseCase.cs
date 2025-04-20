
using Domain.Interfaces;

namespace Application.UseCases.DeleteModerator
{
    public class DeleteModeratorUseCase : IDeleteModeratorUseCase
    {
        private readonly IUserRepository _repo;

        public DeleteModeratorUseCase(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Execute(Guid id)
        {
            return await _repo.RemoveUser(id);
        }
    }
}
