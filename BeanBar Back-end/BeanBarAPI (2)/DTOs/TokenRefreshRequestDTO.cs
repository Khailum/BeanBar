using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BeanBarAPI.DTOs
{
    public class TokenRefreshRequestDTO
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }


}
