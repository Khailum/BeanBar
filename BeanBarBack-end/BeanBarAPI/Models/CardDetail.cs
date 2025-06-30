using System.ComponentModel.DataAnnotations;
using System;
using System.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeanBarAPI.Models
{
    public class CardDetail
    {
        [Key]
        [StringLength(30)]
        public string AccountNumber { get; set; }

        [Required]
        [MaxLength(100)]
        public string Accountholder { get; set; }

        [Required]
        [MaxLength(50)]
        public string AccountType { get; set; }

        [Required]
        [MaxLength(20)]
        public string CardNumber { get; set; }

        [Required]
        [StringLength(4, MinimumLength = 3)]
        public string CVV { get; set; }

        [Required]
        public DateTime ExpiryDate { get; set; }

        public bool IsEncrypted { get; set; } = false;

        [Required]
        [StringLength(13, MinimumLength = 13)]
        public string CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public User User { get; set; }
    }

}

