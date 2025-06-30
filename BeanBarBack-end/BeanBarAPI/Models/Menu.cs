using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BeanBarAPI.Models
{
    public class Menu
    {
        [Key]
        [JsonPropertyName("ItemID")]
        public int ItemID { get; set; }

        [Required]
        [JsonPropertyName("ItemName")]
        public string ItemName { get; set; } = string.Empty;

        [Required]
        [RegularExpression("Hot|Cold|Snack")]
        [JsonPropertyName("ItemType")]
        public string ItemType { get; set; } = string.Empty;
        [JsonPropertyName("ItemDescription")]
        public string? ItemDescription { get; set; }

        [Range(0, double.MaxValue)]
        [JsonPropertyName("Price")]
        public decimal Price { get; set; }

        [JsonPropertyName("IsAvailable")]
        public bool IsAvailable { get; set; } = true;

        [JsonPropertyName("ImageUrl")]
        public string? ImageUrl { get; set; }
    }

}