using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Menu
    {
        [Key]
        public int ItemID { get; set; }

        [Required, MaxLength(100)]
        public string ItemName { get; set; }

        [Required, MaxLength(50)]
        public string ItemType { get; set; } // "Hot", "Cold", "Snack"

        [Required]
        public decimal Price { get; set; }
    }
}
