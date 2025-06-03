using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class Review
    {
        [Key]
        public int ReviewID { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        public string CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public User User { get; set; }

        // Assuming this connects to a menu item (not reflected in DB schema above, but present in the original model)
        [Required]
        public int ItemID { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(500)]
        public string? Comment { get; set; }

        public DateTime ReviewDate { get; set; } = DateTime.Now;
    }
}



