using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    
   
        public class Stock
        {
            public int StockNum { get; set; }
            public int ItemID { get; set; }
            public int AvailableStock { get; set; }
            public DateTime ArrivalDate { get; set; }
            public string StockStatus { get; set; } // "Available", "Low", "Out of Stock"
            public string Unit { get; set; }
            public string SupplierName { get; set; }

            public Menu MenuItem { get; set; } // Optional navigation
        }

    
}
