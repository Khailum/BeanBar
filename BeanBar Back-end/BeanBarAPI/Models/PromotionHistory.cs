using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class PromotionHistory
    {
        [Key]
        public int PromotionID { get; set; }

        [Required]
        [StringLength(13)]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "CustomerID must be a 13-digit number.")]
        public string CustomerID { get; set; }

        [Required]
        public int RefreshTokenID { get; set; }

        [Required]
        [StringLength(50)]
        public string PromotionType { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal PromotionValue { get; set; }

        [Required]
        public DateTime PromotionDate { get; set; } = DateTime.Now;

        [StringLength(500)]
        public string? Notes { get; set; }

        // Navigation properties
        [ForeignKey("CustomerID")]
        public Customer Customer { get; set; }

        [ForeignKey("RefreshTokenID")]
        public RefreshToken RefreshToken { get; set; }

        [Required]
        public bool Used { get; set; } = false;

    }
}