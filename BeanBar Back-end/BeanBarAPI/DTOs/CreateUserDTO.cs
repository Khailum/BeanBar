using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.DTOs
{
    public class CreateUserDTO
    {

        public string Email { get; set; }
        public string Username { get; set; }
        public string UserRole { get; set; }
        public string Password { get; set; } // Used once during registratio

    }
}
