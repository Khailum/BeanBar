using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class CreateOrderDTO
    {
        public int ItemID { get; set; }
        public string CustomerID { get; set; }
        public string Address { get; set; }
        public string OrderType { get; set; }
        public int Quantity { get; set; }
    }

}
