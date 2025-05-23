namespace BeanBar_Back_end.DTOs
{
    public class MenuDTO
    {
        public string ItemName { get; set; }

        public string ItemType { get; set; } // "Hot", "Cold", "Snack"

        public decimal Price { get; set; }

    }
}
