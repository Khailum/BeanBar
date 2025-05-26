using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Menu
    {
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public string Category { get; set; }
        public string ItemType { get; set; } // "Hot", "Cold", "Snack"
        public string ItemDescription { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
        public string ImageUrl { get; set; }
    }

}
