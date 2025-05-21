using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CardDetail
{
    [Key]
    [StringLength(30)]
    public string AccountNumber { get; set; }

    [Required, MaxLength(100)]
    public string Accountholder { get; set; }

    [Required, MaxLength(50)]
    public string AccountType { get; set; }

    [Required, MaxLength(20)]
    public string CardNumber { get; set; }

    [Required, MaxLength(4)]
    public string CVV { get; set; }

    [Required]
    public DateTime ExpiryDate { get; set; }

    public string IDNumber { get; set; }
    public Customer Customer { get; set; }
}
