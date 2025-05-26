using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.DTOs
{
    public class UserDTO
    {

            public string Email { get; set; }
            public string Username { get; set; }
            public string UserRole { get; set; }

    }
}
