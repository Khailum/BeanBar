using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class UserDTO
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string UserRole { get; set; }

        public bool IsActive { get; set; }
        public DateTime DateJoined { get; set; }
    }
}
