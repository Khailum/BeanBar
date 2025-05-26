using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.DTOs
{
    public class OrdersDTO
    {
        public int OrderNum { get; set; }
        public int ItemID { get; set; }
        public string CustomerID { get; set; }
        public string Address { get; set; }
        public DateTime Date { get; set; }
        public string OrderType { get; set; }
        public int Quantity { get; set; }
        public string OrderStatus { get; set; }
        public decimal TotalPrice { get; set; }

    }
}
