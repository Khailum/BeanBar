using System.ComponentModel.DataAnnotations;
using System.Data;

namespace BeanBar_Back_end.Models
{
    public class Delivery
    {
        [Key]
        public int DeliveryID { get; set; }

        public int OrderNum { get; set; }

        public string? DeliveryAddress { get; set; }

        [RegularExpression("Preparing|On the Way|Delivered")]
        public string DeliveryStatus { get; set; } = "Preparing";

        public TimeSpan? EstimatedTime { get; set; }
    }
}

    
