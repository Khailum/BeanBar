using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BeanBarAPI.Models
{
    public class Review
    {
        [Key]
        [JsonPropertyName("reviewID")]
        public int ReviewID { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        [JsonPropertyName("customerID")]
        public string CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public User User { get; set; }

        [Range(1, 5)]
        [JsonPropertyName("rating")]
        public int Rating { get; set; }

        [MaxLength(500)]
        [JsonPropertyName("comment")]
        public string? Comment { get; set; }

        [JsonPropertyName("reviewDate")]
        public DateTime ReviewDate { get; set; } = DateTime.Now;
    }
}

