using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
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
