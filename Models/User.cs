using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; }

        [Required, MaxLength(100)]
        public string Username { get; set; }
        
        [Required]
        [RegularExpression("Admin|Customer")]
        public string UserRole { get; set; } // "Admin" or "Customer"
    }
}
