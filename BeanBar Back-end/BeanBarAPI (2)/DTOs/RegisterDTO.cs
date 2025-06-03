using System;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "Customer ID must contain only numeric digits.")]
        public string CustomerID { get; set; }

        [Required]
        public string FullName { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        //Added so AuthController can inject extracted DOB
        public DateTime? DateOfBirth { get; set; }
    }
}
