using Microsoft.EntityFrameworkCore;
using YourProjectNamespace.Models; // Replace with your actual namespace

public class BeanBarDbContext : DbContext
{
    public BeanBarDbContext(DbContextOptions<BeanBarDbContext> options)
        : base(options)
    {
    }

    // DbSets map to your database tables
    public DbSet<Roles> Roles { get; set; }
    public DbSet<Customers> Customers { get; set; }
    public DbSet<Admin> Admin { get; set; }
    public DbSet<Menu> Menu { get; set; }
    public DbSet<Stock> Stock { get; set; }
    public DbSet<Orders> Orders { get; set; }
    public DbSet<CardDetails> CardDetails { get; set; }
    public DbSet<Tables> Tables { get; set; }

    // Optional: custom table or relationship configuration
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

    }
}