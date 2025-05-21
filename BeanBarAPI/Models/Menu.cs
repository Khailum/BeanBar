using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class MenuItem
{
    [Key]
    public int ItemID { get; set; }

    [Required, MaxLength(100)]
    public string ItemName { get; set; }

    [Required, MaxLength(50)]
    public string ItemType { get; set; } // "Hot", "Cold", "Snack"

    [Required]
    public decimal Price { get; set; }
}
