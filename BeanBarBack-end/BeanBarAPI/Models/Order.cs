using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{

    public class Order
    {
        [Key]
        public int OrderNum { get; set; }

        public int ItemID { get; set; }

        [ForeignKey("ItemID")]
        public Menu Menu { get; set; }  // This now correctly links to ItemID

        public string CustomerID { get; set; } = string.Empty;

        [ForeignKey("CustomerID")]
        public User User { get; set; }

        public string Address { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        [RegularExpression("EatIn|Takeout")]
        public string OrderType { get; set; } = string.Empty;

        public int Quantity { get; set; }

        [RegularExpression("Pending|Completed|Cancelled")]
        public string? OrderStatus { get; set; } = "Pending";

        public decimal TotalPrice { get; set; }

        public string DeliveryOption { get; set; }
    }


}
