using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class Roles
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; }

        [Required]
        [MaxLength(255)]
        public string UserPassword { get; set; }

        [Required]
        [MaxLength(50)]
        public UserRole UserRoles { get; set; }

        //Enum in order to make accessing specific roles safer
        public enum UserRole
        {
            Admin,
            Customer
        }
    }
}
