using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{

        public class Order
        {
            public int OrderNum { get; set; }
            public int ItemID { get; set; }
            public string CustomerID { get; set; }
            public string Address { get; set; }
            public DateTime Date { get; set; }
            public string OrderType { get; set; } // "EatIn" or "Takeout"
            public int Quantity { get; set; }
            public string OrderStatus { get; set; } // "Pending", "Completed", "Cancelled"
            public decimal TotalPrice { get; set; }
        }


}
