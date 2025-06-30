using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class FullCartSubmissionDto
    {
        public List<CartItemDto> CartItems { get; set; }
        public string CustomerID { get; set; }
        public string DeliveryOption { get; set; }
        public decimal TotalPrice { get; set; }
    }

    public class CartItemDto
    {
        public int ItemID { get; set; }
        public int Quantity { get; set; }
    }

}