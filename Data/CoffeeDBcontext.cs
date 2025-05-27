using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Models;

namespace BeanBarAPI.Data
{
    public class CoffeeDBcontext : DbContext
    {
        public CoffeeDBcontext(DbContextOptions<CoffeeDBcontext> options)
            : base(options)
        {
        }

        // Users & Authentication
        public DbSet<User> Users { get; set; }
        public DbSet<UserAuthentication> UserAuth { get; set; }

        // Customers
        public DbSet<Customer> Customers { get; set; }

        // Menu & Stock
        public DbSet<Menu> Menu { get; set; }
        public DbSet<Stock> Stock { get; set; }

        // Orders & Payments
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }

        // Card Details
        public DbSet<CardDetail> CardDetails { get; set; }

        // Table Reservations
        public DbSet<TableReservation> TableReservations { get; set; }

        // Reviews
        public DbSet<Review> Reviews { get; set; }

        // Deliveries
        public DbSet<Delivery> Deliveries { get; set; }

        // Audit Logs
        public DbSet<AuditLog> AuditLogs { get; set; }

        //JWTService
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public DbSet<PromotionHistory> PromotionHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite Key Configuration or Fluent API goes here if needed

            // Ensure relationships, constraints, etc. match your SQL schema
            modelBuilder.Entity<User>()
                .HasKey(u => u.Email);

            modelBuilder.Entity<UserAuthentication>()
                .HasKey(ua => ua.Email);

            modelBuilder.Entity<Customer>()
                .HasKey(c => c.CustomerID);

            modelBuilder.Entity<CardDetail>()
                .HasKey(cd => cd.AccountNumber);

            modelBuilder.Entity<Menu>()
                .Property(m => m.IsAvailable)
                .HasDefaultValue(true);

            modelBuilder.Entity<Order>()
                .Property(o => o.OrderStatus)
                .HasDefaultValue("Pending");

            modelBuilder.Entity<Payment>()
                .Property(p => p.PaymentDate)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Review>()
                .Property(r => r.ReviewDate)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<TableReservation>()
                .Property(r => r.tableStatus)
                .HasDefaultValue("Booked");

            modelBuilder.Entity<TableReservation>()
                .Property(r => r.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<AuditLog>()
                .Property(a => a.AuditTimestamp)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Delivery>()
                .Property(d => d.DeliveryStatus)
                .HasDefaultValue("Preparing");

            base.OnModelCreating(modelBuilder);
        }
    }
}
