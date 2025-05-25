
using System.Text.Json.Serialization;

namespace Application.Dtos
{
    public class PaginatedResult<T>
    {
        [JsonPropertyName("items")]
        public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();

        [JsonPropertyName("totalItems")]
        public int TotalItems { get; set; }

        [JsonPropertyName("totalPages")]
        public int TotalPages { get; set; }

        public PaginatedResult()
        {
        }

        public PaginatedResult(IEnumerable<T> items, int totalItems, int pageSize)
        {
            Items = items;
            TotalItems = totalItems;
            TotalPages = (int)Math.Ceiling((double)totalItems / pageSize);
        }
    }
}
