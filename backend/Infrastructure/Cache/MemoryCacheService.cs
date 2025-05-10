using Application.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Concurrent;
using System.Text.RegularExpressions;

namespace Infrastructure.Cache
{
    public class MemoryCacheService : ICacheService
    {
        private readonly IMemoryCache _cache;
        private readonly ConcurrentDictionary<string, byte> _keys = new();

        public MemoryCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public Task<T?> GetAsync<T>(string key)
        {
            return Task.FromResult(_cache.Get<T?>(key));
        }

        public Task SetAsync<T>(string key, T value, TimeSpan expiration)
        {
            _keys.TryAdd(key, 0);
            _cache.Set(key, value, expiration);
            return Task.CompletedTask;
        }

        public Task RemoveAsync(string key)
        {
            _keys.TryRemove(key, out _);
            _cache.Remove(key);
            return Task.CompletedTask;
        }

        public Task<bool> ExistsAsync(string key)
        {
            return Task.FromResult(_cache.TryGetValue(key, out _));
        }

        public Task RemoveByPatternAsync(string pattern)
        {
            var matches = _keys.Where(k => k.Key.Contains(pattern)).Select(k => k.Key).ToList();

            foreach (var key in matches)
            {
                _keys.TryRemove(key, out _);
                _cache.Remove(key);
            }

            return Task.CompletedTask;
        }
    }
}
