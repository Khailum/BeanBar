namespace BeanBar_Back_end.DTOs
{
    public class OrdersDTO
    {
        public int OrderNum { get; set; }  

        public int ItemID { get; set; }

        public string IDNumber { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public DateTime OrderDate { get; set; }

        public string OrderType { get; set; } = string.Empty;

    }
}
