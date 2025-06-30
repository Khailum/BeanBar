namespace BeanBarAPI.DTOs
{
    public class CartDTO
    {
        public int CartID { get; set; }
        public int OrderNum { get; set; }
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public string ItemType { get; set; }
        public string ItemDescription { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateAdded { get; set; }
        public string DeliveryOption { get; set; } = "instore"; // default value
    }
}

