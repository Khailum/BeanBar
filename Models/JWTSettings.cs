using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class JwtSettings
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int AccessTokenExpirationMinutes { get; set; }
        public int RefreshTokenExpirationDays { get; set; }
    }
}
