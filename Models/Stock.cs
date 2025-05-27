using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    
   
        public class Stock
        {
        [Key]
        public int StockNum { get; set; }

        public int ItemID { get; set; }

        public int Available_Stock { get; set; }

        public DateTime Arrival_Date { get; set; }

        [RegularExpression("Available|Low|Out of Stock")]
        public string? StockStatus { get; set; }

        public string? Unit { get; set; } = "Kg";

        public string? SupplierName { get; set; }

        public Menu MenuItem { get; set; } // Optional navigation
        }

    
}
