using System;

namespace BeanBar_Back_end.Models
{
    public class Payment
    {
        public int PaymentID { get; set; }
        public int OrderNum { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } // "Cash", "Card", "EFT"
        public DateTime PaymentDate { get; set; }
    }

}