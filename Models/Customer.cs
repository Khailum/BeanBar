using System.ComponentModel.DataAnnotations;
using System.Data;

namespace BeanBar_Back_end.Models
{
    public class Customer
    {
        [Key]
        public string CustomerID { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; } 
    }
}
