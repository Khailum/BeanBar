using System;

namespace BeanBar_Back_end.Models
{
    public class Review
    {
        public int ReviewID { get; set; }
        public string CustomerID { get; set; }
        public int ItemID { get; set; }
        public int Rating { get; set; } // 1 to 5
        public string Comment { get; set; }
        public DateTime ReviewDate { get; set; }
    }

}

