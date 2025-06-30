using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Token { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 13, ErrorMessage = "Customer ID must be exactly 13 digits.")]
        public string CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public User User { get; set; }

        [Required]
        public DateTime Expires { get; set; }

        [Required]
        public DateTime Created { get; set; }

        public DateTime? Revoked { get; set; }

        [MaxLength(500)]
        public string? ReplacedByToken { get; set; }

        // Computed properties (not mapped to DB)
        [NotMapped]
        public bool IsExpired => DateTime.UtcNow >= Expires;

        [NotMapped]
        public bool IsActive => Revoked == null && !IsExpired;
    }
}
