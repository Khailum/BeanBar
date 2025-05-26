using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBar_Back_end.DTOs
{
    public class UserAuthDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
