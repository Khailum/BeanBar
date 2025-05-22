using Microsoft.EntityFrameworkCore;
using BeanBar_Back_end.Models;
using System;

namespace BeanBar_Back_end.Data
{
    public class CoffeeDBcontext : DbContext
    {
        public CoffeeDBcontext(DbContextOptions<CoffeeDBcontext> options)
            : base(options)
        {
        }

        public DbSet<Customers> Customers { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Roles> Role { get; set; }
        public DbSet<CardDetails> CardDetails { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<Reservations> TableReservations { get; set; }
    }
}
