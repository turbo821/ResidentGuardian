
namespace Infrastructure.FileStorage
{
    public class YandexStorageOptions
    {
        public string BucketName { get; set; } = string.Empty;
        public string ServiceUrl { get; set; } = string.Empty;
        public string AccessKey { get; set; } = string.Empty;
        public string SecretKey { get; set; } = string.Empty;
    }
}
