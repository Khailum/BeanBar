using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace BeanBarAPI.DTOs
{
    public class UserAuthDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
