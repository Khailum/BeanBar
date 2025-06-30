namespace BeanBarAPI.DTOs
{
    public class OrderCreateDto
    {
        public int MenuID { get; set; }
        public string Address { get; set; }
        public string CustomerID { get; set; }
        public string OrderType { get; set; }  // e.g. "DineIn", "Takeaway"
        public int Quantity { get; set; }
        public string OrderStatus { get; set; }  // e.g. "Pending"
        public decimal TotalPrice { get; set; }
        public string DeliveryOption { get; set; }  // e.g. "Delivery", "Pickup"
    }

}