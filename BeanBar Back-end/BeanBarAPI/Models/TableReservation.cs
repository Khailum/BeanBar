using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class TableReservation
    {
        public int TableNum { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan ReservationTime { get; set; }
        public int PartySize { get; set; }
        public string CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string TableStatus { get; set; } // "Booked", "Seated", "Cancelled"
        public string Occasion { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
