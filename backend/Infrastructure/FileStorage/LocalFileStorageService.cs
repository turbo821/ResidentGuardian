using Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.FileStorage
{
    public class LocalFileStorageService : IFileStorageService
    {
        private readonly string _rootPath;
        private readonly string _uploadFolder;
        private readonly string[] _allowedImageMimeTypes = new[]
        {
            "image/jpeg", "image/png", "image/gif", "image/webp"
        };

        public LocalFileStorageService(IOptions<FileStorageOptions> options)
        {
            _rootPath = options.Value.RootPath;
            _uploadFolder = options.Value.UploadFolder;
        }

        public async Task<string> SaveImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Файл пустой");

            if (!_allowedImageMimeTypes.Contains(file.ContentType.ToLower()))
                throw new ArgumentException("Недопустимый тип файла. Ожидается изображение.");

            string absolutePath = Path.Combine(_rootPath, _uploadFolder);

            if (!Directory.Exists(absolutePath))
                Directory.CreateDirectory(absolutePath);

            string extension = Path.GetExtension(file.FileName);
            string fileName = Guid.NewGuid().ToString() + extension;
            string filePath = Path.Combine(absolutePath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        public Task<bool> DeleteImage(string imageUri)
        {
            if (string.IsNullOrWhiteSpace(imageUri))
                return Task.FromResult(false);

            string filePath = Path.Combine(_rootPath, _uploadFolder, imageUri);

            if (!File.Exists(filePath))
                return Task.FromResult(false);

            try
            {
                File.Delete(filePath);  
                return Task.FromResult(true);
            }
            catch
            {
                return Task.FromResult(false);
            }
        }
    }
}