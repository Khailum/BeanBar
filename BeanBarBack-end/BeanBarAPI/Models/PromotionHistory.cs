using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BeanBarAPI.Models
{
    public class PromotionHistory
    {
        [Key]
        [JsonPropertyName("PromotionID")]
        public int PromotionID { get; set; }

        [Required]
        [StringLength(13)]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "CustomerID must be a 13-digit number.")]
        [JsonPropertyName("CustomerID")]
        public string CustomerID { get; set; }

        [Required]
        [JsonPropertyName("RefreshTokenID")]
        public int? RefreshTokenID { get; set; } // Changed from string to int?

        [Required]
        [StringLength(50)]
        [JsonPropertyName("PromotionType")]
        public string PromotionType { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        [JsonPropertyName("PromotionValue")]
        public decimal PromotionValue { get; set; }

        [Required]
        [JsonPropertyName("PromotionDate")]
        public DateTime PromotionDate { get; set; } = DateTime.Now;

        [StringLength(500)]
        [JsonPropertyName("PromotionDate")]
        public string? Notes { get; set; }

        // Navigation properties
        [ForeignKey("Notes")]
        public User User { get; set; }

        [ForeignKey("RefreshTokenID")]
        public RefreshToken RefreshToken { get; set; }

        [Required]
        [ForeignKey("Used")]
        public bool Used { get; set; } = false;

    }
}