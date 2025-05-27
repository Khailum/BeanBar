using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class ReservationsDTO
    {
        public int TableNum { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan ReservationTime { get; set; }
        public int PartySize { get; set; }
        public string CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string TableStatus { get; set; }
        public string Occasion { get; set; }
        public string Notes { get; set; }
    }
}
