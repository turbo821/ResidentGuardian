using Microsoft.AspNetCore.Http;

namespace Application.Services.Interfaces
{
    public interface IFileStorage
    {
        Task<string> SaveImageAsync(IFormFile file);
        bool DeleteImage(string imageUri);
    }
}