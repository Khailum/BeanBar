using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Reservations
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
        [StringLength(13)]
        public string IDNumber { get; set; } = string.Empty;

        public string CustomerName { get; set; }
    }
}
