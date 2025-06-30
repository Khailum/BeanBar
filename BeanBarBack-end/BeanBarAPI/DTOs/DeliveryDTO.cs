using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class DeliveryDTO
    {
        public int DeliveryID { get; set; }
        public int OrderNum { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryStatus { get; set; }
        public TimeSpan? EstimatedTime { get; set; }
    }

}
