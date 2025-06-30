using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BeanBarAPI.Models
{


    public class Stock
    {
        [Key]
        [JsonPropertyName("stockNum")]
        public int StockNum { get; set; }

        [JsonPropertyName("StockName")]
        public string StockName { get; set; }

        [JsonPropertyName("Available_Stock")]
        public int Available_Stock { get; set; }

        [JsonPropertyName("Arrival_Date")]
        public DateTime Arrival_Date { get; set; }

        [RegularExpression("Available|Low|Out of Stock")]
        [JsonPropertyName("StockStatus")]
        public string? StockStatus { get; set; }

        [JsonPropertyName("Unit")]
        public string? Unit { get; set; } = "Kg";

        [JsonPropertyName("SupplierName")]
        public string? SupplierName { get; set; }
    }


}