using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class User
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; } // Primary key

        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [RegularExpression("Admin|Customer", ErrorMessage = "UserRole must be either 'Admin' or 'Customer'.")]
        public string UserRole { get; set; }

        public bool IsActive { get; set; } = true;

        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "Customer ID must be exactly 13 numeric digits.")]
        public string? CustomerID { get; set; } // Nullable - only for customers

        [Phone]
        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? Token { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? LastPromotionDate { get; set; }
    }

}
