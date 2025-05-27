using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class LoginDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
