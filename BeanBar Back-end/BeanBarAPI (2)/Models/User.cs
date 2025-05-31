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
        public string Password { get; set; }

        [Required]
        [RegularExpression("Admin|Customer")]
        public string UserRole { get; set; }

        public bool isActive { get; set; } = true;

        // Optional navigation property
        public Customer Customer { get; set; }
    }

}
