using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class StockDTO
    {
        public int StockNum { get; set; }
        public int ItemID { get; set; }
        public int AvailableStock { get; set; }
        public DateTime ArrivalDate { get; set; }
        public string StockStatus { get; set; }
        public string Unit { get; set; }
        public string SupplierName { get; set; }
    }
}
