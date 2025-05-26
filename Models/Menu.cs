using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Menu
    {
        [Key]
        public int ItemID { get; set; }

        [Required]
        public string ItemName { get; set; } = string.Empty;

        public string? Category { get; set; }

        [Required]
        [RegularExpression("Hot|Cold|Snack")]
        public string ItemType { get; set; } = string.Empty;

        public string? ItemDescription { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        public bool IsAvailable { get; set; } = true;

        public string? ImageUrl { get; set; }
    }

}
