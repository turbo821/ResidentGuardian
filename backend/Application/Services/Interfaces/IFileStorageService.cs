using Microsoft.AspNetCore.Http;

namespace Application.Services.Interfaces
{
    public interface IFileStorageService
    {
        Task<string> SaveImageAsync(IFormFile file);
        Task<bool> DeleteImage(string imageUri);
    }
}