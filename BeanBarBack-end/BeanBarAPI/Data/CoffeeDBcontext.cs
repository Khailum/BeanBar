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

        // JWT Service
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        // Promotion History
        public DbSet<PromotionHistory> PromotionHistory { get; set; }

        // Cart
        public DbSet<Cart> Cart { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Defaults
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

            // Foreign Key Relationships
            modelBuilder.Entity<CardDetail>()
                .HasOne(cd => cd.User)
                .WithMany()
                .HasForeignKey(cd => cd.CustomerID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TableReservation>()
                .HasOne(tr => tr.User)
                .WithMany()
                .HasForeignKey(tr => tr.CustomerID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RefreshToken>()
                .HasOne(rt => rt.User)
                .WithMany()
                .HasForeignKey(rt => rt.CustomerID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.CustomerID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PromotionHistory>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.CustomerID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PromotionHistory>()
                .HasOne(p => p.RefreshToken)
                .WithMany()
                .HasForeignKey(p => p.RefreshTokenID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Delivery>()
                .HasOne(d => d.Order)
                .WithMany()
                .HasForeignKey(d => d.OrderNum)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cart>()
               .HasOne(c => c.Order)
               .WithMany() // assuming Order does not have a Cart collection navigation; add if you want
               .HasForeignKey(c => c.OrderNum)
               .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);
        }
    }
}
