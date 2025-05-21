using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Admin
{
    [Key]
    public int AdminID { get; set; }

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