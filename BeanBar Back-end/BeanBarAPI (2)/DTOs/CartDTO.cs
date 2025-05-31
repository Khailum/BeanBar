namespace BeanBarAPI.DTOs
{
    public class CartDTO
    {
        public int CartID { get; set; }
        public int OrderNum { get; set; }
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public string Category { get; set; }
        public string ItemType { get; set; }
        public string ItemDescription { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
