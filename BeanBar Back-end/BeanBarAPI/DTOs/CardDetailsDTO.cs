using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class CardDetailsDTO
    {
        public string AccountNumber { get; set; }
        public string Accountholder { get; set; }
        public string AccountType { get; set; }
        public string CardNumber { get; set; } // Masked or encrypted
        public string CVV { get; set; } // Masked or encrypted
        public DateTime ExpiryDate { get; set; }
        public string CustomerID { get; set; }

    }
}
