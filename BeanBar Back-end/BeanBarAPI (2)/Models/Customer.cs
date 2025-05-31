using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class Customer
    {
        [Key]
        [MaxLength(20)]
        public string CustomerID { get; set; } // South African ID

        [Required, MaxLength(100)]
        public string FirstName { get; set; }

        [Required, MaxLength(100)]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [MaxLength(200)]
        public string Address { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Token { get; set; }  
        public DateTime LastPromotionDate { get; set; }

    }
}
