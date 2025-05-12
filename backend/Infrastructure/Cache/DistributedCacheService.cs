using Application.Services.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Infrastructure.Cache
{
    public class DistributedCacheService : ICacheService
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly IDatabase _db;
        private readonly JsonSerializerOptions _jsonOptions;

        public DistributedCacheService(
            IConnectionMultiplexer redis,
            JsonSerializerOptions? jsonOptions = null)
        {
            _redis = redis;
            _db = redis.GetDatabase();
            _jsonOptions = jsonOptions ?? new JsonSerializerOptions();
        }

        public async Task<T?> GetAsync<T>(string key)
        {
            try
            {
                var redisValue = await _db.StringGetAsync(key);
                if (redisValue.IsNullOrEmpty)
                    return default;

                return JsonSerializer.Deserialize<T>(redisValue!, _jsonOptions);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to get value from Redis", ex);
            }
        }

        public async Task SetAsync<T>(string key, T value, TimeSpan expiration)
        {
            try
            {
                var serializedValue = JsonSerializer.Serialize(value, _jsonOptions);
                await _db.StringSetAsync(
                    key,
                    serializedValue,
                    expiration,
                    When.Always,
                    CommandFlags.FireAndForget);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to set value in Redis", ex);
            }
        }

        public async Task RemoveAsync(string key)
        {
            try
            {
                await _db.KeyDeleteAsync(key, CommandFlags.FireAndForget);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to remove key from Redis", ex);
            }
        }

        public async Task<bool> ExistsAsync(string key)
        {
            try
            {
                return await _db.KeyExistsAsync(key);
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to check key existence in Redis", ex);
            }
        }

        public async Task RemoveByPatternAsync(string pattern)
        {
            try
            {
                var endpoints = _redis.GetEndPoints();
                var server = _redis.GetServer(endpoints.First());

                var keys = server.Keys(pattern: $"*{pattern}*").ToArray();

                if (keys.Length > 0)
                {
                    await _db.KeyDeleteAsync(keys);
                }
            }
            catch (RedisException ex)
            {
                throw new Exception("Failed to remove keys by pattern", ex);
            }
        }
    }
}
