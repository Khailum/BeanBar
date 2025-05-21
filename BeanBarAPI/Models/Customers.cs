using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Customer
{
    [Key]
    [StringLength(13)]
    public string IDNumber { get; set; }

    [Required, MaxLength(100)]
    public string FirstName { get; set; }

    [Required, MaxLength(100)]
    public string LastName { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    [Required, MaxLength(20)]
    public string PhoneNumber { get; set; }

    [MaxLength(255)]
    public string Address { get; set; }

    // Navigation property
    public Role Role { get; set; }
}
