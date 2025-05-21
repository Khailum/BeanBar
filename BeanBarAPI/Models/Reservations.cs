using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Reservations
{
    [Key]
    public int TableNum { get; set; }

    [Required]
    public DateTime ReservationDate { get; set; }

    [Required]
    public TimeSpan ReservationTime { get; set; }

    [Required]
    public int PartySize { get; set; }

    [Required]
    [StringLength(13)]
    public string IDNumber { get; set; }

    public string? CustomerName { get; set; }
}
