using System;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class UserAuthentication
    {
        [Key]
        public string Email { get; set; }

        [Required]
        public string HashedPassword { get; set; }

        [Required]
        public string Salt { get; set; }

        public User? User { get; set; } // Navigation reference (optional)
    }

}