using System.ComponentModel.DataAnnotations;
using System.Data;

namespace BeanBar_Back_end.Models
{
    public class Delivery
    {
        public int DeliveryID { get; set; }
        public int OrderNum { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryStatus { get; set; } // "Preparing", "On the Way", "Delivered"
        public TimeSpan? EstimatedTime { get; set; }
    }
}

    
