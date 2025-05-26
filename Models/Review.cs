using System;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Review
    {
        [Key]
        public int ReviewID { get; set; }

        public string CustomerID { get; set; } = string.Empty;

        public int ItemID { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public string? Comment { get; set; }

        public DateTime ReviewDate { get; set; } = DateTime.Now;
    }
}



