using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BeanBarAPI.Models
{
    public class Delivery
    {
        [Key]
        [JsonPropertyName("DeliveryID")]
        public int DeliveryID { get; set; }

        [JsonPropertyName("OrderNum")]
        public int OrderNum { get; set; }

        [JsonPropertyName("Order")]
        public Order Order { get; set; }

        [JsonPropertyName("DeliveryAddress")]
        public string? DeliveryAddress { get; set; }

        [JsonPropertyName("DeliveryStatus")]
        [RegularExpression("Preparing|On the Way|Delivered")]
        public string DeliveryStatus { get; set; } = "Preparing";

        [JsonPropertyName("EstimatedTime")]
        public TimeSpan? EstimatedTime { get; set; }
    }
}