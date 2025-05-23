namespace BeanBar_Back_end.DTOs
{
    public class ReservationsDTO
    {
        public int TableNum { get; set; }

        public DateTime ReservationDate { get; set; }

        public TimeSpan ReservationTime { get; set; }

        public int PartySize { get; set; }

        public string IDNumber { get; set; } = string.Empty;

        public string CustomerName { get; set; }
    }
}
