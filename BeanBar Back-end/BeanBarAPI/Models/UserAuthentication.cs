using System;

namespace BeanBar_Back_end.Models
{
    public class UserAuthentication
    {
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }

        public User User { get; set; } // Navigation reference (optional)
    }

}