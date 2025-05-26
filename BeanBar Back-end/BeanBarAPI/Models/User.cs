using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.Models
{
    public class User
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string UserRole { get; set; } // "Admin" or "Customer"
    }
}
