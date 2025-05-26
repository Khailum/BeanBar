using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.DTOs
{
    public class ReviewDTO
    {
        public int ReviewID { get; set; }
        public string CustomerID { get; set; }
        public int ItemID { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime ReviewDate { get; set; }
    }

}
