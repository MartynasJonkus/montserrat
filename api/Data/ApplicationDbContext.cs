using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public required DbSet<Category> Categories { get; set; }
        public required DbSet<Customer> Customers { get; set; }
        public required DbSet<Discount> Discounts { get; set; }
        public required DbSet<Employee> Employees { get; set; }
        public required DbSet<GiftCard> GiftCards { get; set; }
        public required DbSet<Merchant> Merchants { get; set; }
        public required DbSet<Order> Orders { get; set; }
        public required DbSet<OrderDiscount> OrderDiscounts { get; set; }
        public required DbSet<OrderItem> OrderItems { get; set; }
        public required DbSet<Payment> Payments { get; set; }
        public required DbSet<Product> Products { get; set; }
        public required DbSet<ProductVariant> ProductVariants { get; set; }
        public required DbSet<Refund> Refunds { get; set; }
        public required DbSet<Reservation> Reservations { get; set; }
        public required DbSet<Service> Services { get; set; }
        public required DbSet<Tax> Taxes { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Merchant>()
                .OwnsOne(m => m.Address);

            modelBuilder.Entity<Order>()
                .OwnsOne(o => o.TotalAmount);
            modelBuilder.Entity<OrderItem>()
                .OwnsOne(oi => oi.Price);
            modelBuilder.Entity<Service>()
                .OwnsOne(s => s.Price);
            modelBuilder.Entity<Product>()
                .OwnsOne(p => p.Price);
            modelBuilder.Entity<Refund>()
                .OwnsOne(r => r.RefundAmount);
                
            modelBuilder.Entity<Refund>()
                .HasOne(r => r.Payment)
                .WithOne(p => p.Refund)
                .HasForeignKey<Refund>(r => r.PaymentId)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductVariants)
                .WithOne(v => v.Product)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Employee>()
                .HasIndex(e => e.Username)
                .IsUnique()
                .HasDatabaseName("IX_Employee_Username");
        }
    }
}