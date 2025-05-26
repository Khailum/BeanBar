
﻿using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class CardDetail
    {
        public string AccountNumber { get; set; }
        public string Accountholder { get; set; }
        public string AccountType { get; set; }
        public string CardNumber { get; set; } // Encrypted or dummy
        public string CVV { get; set; } // Encrypted or dummy
        public DateTime ExpiryDate { get; set; }
        public bool IsEncrypted { get; set; }
        public string CustomerID { get; set; }
    }

}

