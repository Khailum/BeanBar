using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderNum { get; set; }  //Primary Key // Starts at 100 due to DB config

        [Required]
        public int ItemID { get; set; }    // Foreign Key

        [Required]
        [StringLength(13)]
        public string IDNumber { get; set; } = string.Empty;  // Foreign Key to Customers

        [Required]
        [StringLength(255)]
        public string Address { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime OrderDate { get; set; }

        [Required]
        [StringLength(50)]
        [RegularExpression("EatIn|Takeout", ErrorMessage = "OrderType must be either 'EatIn' or 'Takeout'.")]
        public string OrderType { get; set; } = string.Empty;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }
    }
}
