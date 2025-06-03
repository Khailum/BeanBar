using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class TableReservation
    {
        [Key]
        public int TableNum { get; set; }

        [Required]
        public DateTime ReservationDate { get; set; }

        [Required]
        public TimeSpan ReservationTime { get; set; }

        [Required]
        public int PartySize { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        public string CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public User User { get; set; }

        [MaxLength(80)]
        public string? CustomerName { get; set; }

        [Required]
        [RegularExpression("Booked|Seated|Cancelled", ErrorMessage = "tableStatus must be either Booked, Seated, or Cancelled.")]
        public string tableStatus { get; set; } = "Booked";

        [MaxLength(100)]
        public string? Occasion { get; set; }

        [MaxLength(255)]
        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}
