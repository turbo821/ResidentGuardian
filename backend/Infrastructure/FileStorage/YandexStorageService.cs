using Amazon.S3;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<YandexStorageService> _logger;
        private readonly string[] _allowedImageMimeTypes = new[]
        {
            "image/jpeg", "image/png", "image/gif", "image/webp"
        };

        public YandexStorageService(
            IOptions<YandexStorageOptions> options,
            ILogger<YandexStorageService> logger)
        {
            _bucketName = options.Value.BucketName;
            _serviceUrl = options.Value.ServiceUrl;
            _accessKey = options.Value.AccessKey;
            _secretKey = options.Value.SecretKey;
            _logger = logger;
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
            {
                _logger.LogWarning("Attempt to upload an empty file.");
                throw new ArgumentException("File is empty.");
            }

            if (!_allowedImageMimeTypes.Contains(file.ContentType.ToLower()))
            {
                _logger.LogWarning("Invalid file type: {ContentType}", file.ContentType);
                throw new ArgumentException("Invalid file type. Image expected.");
            }

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

                _logger.LogInformation("File {FileName} uploaded successfully to bucket {BucketName}.", fileName, _bucketName);
                return fileName;
            }
            catch (AmazonS3Exception ex)
            {
                _logger.LogError(ex, "AmazonS3Exception occurred while uploading file {FileName} to bucket {BucketName}.", fileName, _bucketName);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error occurred while uploading file {FileName}.", fileName);
                throw;
            }
        }

        public async Task<bool> DeleteImage(string imageUri)
        {
            if (string.IsNullOrWhiteSpace(imageUri))
            {
                _logger.LogWarning("Attempt to delete a file with an empty name.");
                return false;
            }

            using var client = CreateClient();

            try
            {
                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = imageUri
                };

                await client.DeleteObjectAsync(deleteRequest);
                _logger.LogInformation("File {ImageUri} deleted successfully from bucket {BucketName}.", imageUri, _bucketName);
                return true;
            }
            catch (AmazonS3Exception ex)
            {
                _logger.LogError(ex, "AmazonS3Exception occurred while deleting file {ImageUri} from bucket {BucketName}.", imageUri, _bucketName);
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error occurred while deleting file {ImageUri}.", imageUri);
                return false;
            }
        }
    }
}
