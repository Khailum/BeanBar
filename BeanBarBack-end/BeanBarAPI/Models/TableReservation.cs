using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BeanBarAPI.Models
{
    public class TableReservation
    {
        [Key]
        [JsonPropertyName("TableNum")]
        public int TableNum { get; set; }

        [Required]
        [JsonPropertyName("ReservationDate")]
        public DateTime ReservationDate { get; set; }

        [Required]
        [JsonPropertyName("ReservationTime")]
        public TimeSpan ReservationTime { get; set; }

        [Required]
        [JsonPropertyName("PartySize")]
        public int PartySize { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        [JsonPropertyName("CustomerID")]
        public string CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public User User { get; set; }

        [MaxLength(80)]
        [JsonPropertyName("CustomerName")]
        public string? CustomerName { get; set; }

        [Required]
        [RegularExpression("Booked|Seated|Cancelled", ErrorMessage = "tableStatus must be either Booked, Seated, or Cancelled.")]
        [JsonPropertyName("tableStatus")]
        public string tableStatus { get; set; } = "Booked";

        [MaxLength(100)]
        [JsonPropertyName("Occasion")]
        public string? Occasion { get; set; }

        [MaxLength(255)]
        [JsonPropertyName("Notes")]
        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}