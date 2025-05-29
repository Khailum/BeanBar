using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class RefreshToken
    {
        public string Id { get; set; }                  // Primary key
        public string Token { get; set; }            // The actual refresh token string
        public string UserId { get; set; }           // Link to user (adjust type if your user id is int)
        public DateTime Expires { get; set; }        // Expiry date
        public DateTime Created { get; set; }        // Creation timestamp
        public DateTime? Revoked { get; set; }       // If revoked, timestamp when revoked
        public string ReplacedByToken { get; set; }  // If rotated, new token replacing this one

        public bool IsExpired => DateTime.UtcNow >= Expires;
        public bool IsActive => Revoked == null && !IsExpired;
    }
}
