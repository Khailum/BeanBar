using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class UserProfileDto
    {
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string UserRole { get; set; } = string.Empty;
        public string? CustomerID { get; set; }
        public string? FullName { get; set; }
        public DateTime? JoinedDate { get; set; }
    }
}
