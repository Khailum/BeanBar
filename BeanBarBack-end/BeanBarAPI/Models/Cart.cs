using BeanBarAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.Models
{
    public class Cart
    {
        [Key]
        public int CartID { get; set; }

        [Required]
        public int OrderNum { get; set; } // FK to Orders table
        public Order Order { get; set; }

        [Required]
        public int ItemID { get; set; } // Optional FK to Menu (can skip FK if you're copying data only)

        [Required, MaxLength(100)]
        public string ItemName { get; set; }

        [Required, MaxLength(50)]
        public string ItemType { get; set; }

        public int Quantity { get; set; }

        [MaxLength(300)]
        public string ItemDescription { get; set; }

        [Required]
        public decimal Price { get; set; }

        public bool IsAvailable { get; set; } = true;

        [MaxLength(255)]
        public string ImageUrl { get; set; }

        public DateTime DateAdded { get; set; } = DateTime.Now;

        public string DeliveryOption { get; set; } = "instore"; // default value
    }

}

