using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class Customer
    {
        [Key]
        [StringLength(13)]
        public string CustomerID { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }

        public string Token { get; set; }

        // ✅ Add this:
        public DateTime DateOfBirth { get; set; }

        // ✅ This already exists but update it to nullable:
        public DateTime? LastPromotionDate { get; set; }
    }

}
