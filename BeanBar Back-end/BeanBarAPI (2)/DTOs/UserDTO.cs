using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class UserDTO
    {
        [EmailAddress]
        public string Email { get; set; }

        [MaxLength(100)]
        public string FullName { get; set; }

        public string UserRole { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; } // Maps to database's CreatedAt

        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "Customer ID must be exactly 13 numeric digits.")]
        public string? CustomerID { get; set; } // Nullable — only for customers

        [Phone]
        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? LastPromotionDate { get; set; }

        public string? Token { get; set; } // Optional — only used in some contexts (e.g., login/session)
    }
}
