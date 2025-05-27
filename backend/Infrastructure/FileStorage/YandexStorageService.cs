
using Amazon.S3;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Amazon.S3.Transfer;
using Amazon.S3.Model;

namespace Infrastructure.FileStorage
{
    public class YandexStorageService : IFileStorageService
    {
        private readonly string _bucketName;
        private readonly string _serviceUrl;
        private readonly string _accessKey;
        private readonly string _secretKey;
        private readonly string[] _allowedImageMimeTypes = new[]
        {
        "image/jpeg", "image/png", "image/gif", "image/webp"
        };

        public YandexStorageService(IOptions<YandexStorageOptions> options)
        {
            _bucketName = options.Value.BucketName;
            _serviceUrl = options.Value.ServiceUrl;
            _accessKey = options.Value.AccessKey;
            _secretKey = options.Value.SecretKey;
        }

        private AmazonS3Client CreateClient()
        {
            var config = new AmazonS3Config
            {
                ServiceURL = _serviceUrl
            };

            return new AmazonS3Client(_accessKey, _secretKey, config);
        }

        public async Task<string> SaveImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Файл пустой");

            if (!_allowedImageMimeTypes.Contains(file.ContentType.ToLower()))
                throw new ArgumentException("Недопустимый тип файла. Ожидается изображение.");

            var extension = Path.GetExtension(file.FileName);
            var fileName = Guid.NewGuid().ToString() + extension;

            try
            {

                using var client = CreateClient();
                using var stream = file.OpenReadStream();

                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = stream,
                    Key = fileName,
                    BucketName = _bucketName,
                    ContentType = file.ContentType,
                    CannedACL = S3CannedACL.BucketOwnerFullControl
                };

                var transferUtility = new TransferUtility(client);
                await transferUtility.UploadAsync(uploadRequest);

                return fileName;
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
                Console.WriteLine($"Error Code: {ex.ErrorCode}");
                Console.WriteLine($"Request ID: {ex.RequestId}");
                Console.WriteLine($"HTTP Status Code: {ex.StatusCode}");
                return fileName;
            }
        }

        public async Task<bool> DeleteImage(string imageUri)
        {
            if (string.IsNullOrWhiteSpace(imageUri))
                return false;

            using var client = CreateClient();

            try
            {
                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = imageUri
                };

                await client.DeleteObjectAsync(deleteRequest);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
