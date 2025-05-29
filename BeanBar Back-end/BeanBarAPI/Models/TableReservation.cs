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

        public DateTime ReservationDate { get; set; }

        public TimeSpan ReservationTime { get; set; }

        public int PartySize { get; set; }

        public string CustomerID { get; set; } = string.Empty;

        public string? CustomerName { get; set; }

        [RegularExpression("Booked|Seated|Cancelled")]
        public string tableStatus { get; set; } = "Booked";

        public string? Occasion { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}
