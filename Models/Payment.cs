using System;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Payment
    {
        [Key]
        public int PaymentID { get; set; }

        public int OrderNum { get; set; }

        public decimal Amount { get; set; }

        [RegularExpression("Cash|Card|EFT")]
        public string PaymentMethod { get; set; } = string.Empty;

        public DateTime PaymentDate { get; set; } = DateTime.Now;
    }

}