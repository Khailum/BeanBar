using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class CardDetail
    {
        [Key]
        public string AccountNumber { get; set; } = string.Empty;

        public string Accountholder { get; set; } = string.Empty;

        public string AccountType { get; set; } = string.Empty;

        public string CardNumber { get; set; } = string.Empty;

        public string CVV { get; set; } = string.Empty;

        public DateTime ExpiryDate { get; set; }

        public bool IsEncrypted { get; set; }

        public string CustomerID { get; set; } = string.Empty;
    }

}

