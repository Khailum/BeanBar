namespace BeanBar_Back_end.DTOs
{
    public class StockDTO
    {
        public int StockNum { get; set; }  // Primary Key // Auto-increments from 1

        public int ItemID { get; set; }    // Foreign Key

        [Range(0, int.MaxValue, ErrorMessage = "Available stock cannot be negative.")]
        public int Available_Stock { get; set; }

        public DateTime Arrival_Date { get; set; }

    }
}
