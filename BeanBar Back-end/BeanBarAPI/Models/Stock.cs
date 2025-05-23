using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Stock
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StockNum { get; set; }  // Primary Key // Auto-increments from 1

        [Required]
        public int ItemID { get; set; }    // Foreign Key

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Available stock cannot be negative.")]
        public int Available_Stock { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Arrival_Date { get; set; }
    }
}
