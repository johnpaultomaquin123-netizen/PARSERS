using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<KioskItem> KioskItems { get; set; }
        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Seed initial Parsers Merchandise items and sample student account
            modelBuilder.Entity<KioskItem>().HasData(
                new KioskItem { Id = 1, Name = "Dept Shirt V.1", Category = "Shirts", SubCategory = "Polo Shirts", Price = 500.00m, ImageUrl = "/images/dept_shirt_v1.png" },
                new KioskItem { Id = 2, Name = "Dept Shirt V.2", Category = "Shirts", SubCategory = "Polo Shirts", Price = 500.00m, ImageUrl = "/images/dept_shirt_v2.png" },
                new KioskItem { Id = 3, Name = "School Uniform", Category = "Shirts", SubCategory = "Uniform", Price = 1500.00m, ImageUrl = "/images/school_uniform.png", Badge = "A must" },
                new KioskItem { Id = 4, Name = "Parser Backpack", Category = "Bags", SubCategory = "Backpack", Price = 500.00m, ImageUrl = "/images/parser_backpack.png", Badge = "Bestseller" },
                new KioskItem { Id = 5, Name = "Cap 2090", Category = "Caps", SubCategory = "All", Price = 400.00m, ImageUrl = "/images/cap_2090.png" },
                new KioskItem { Id = 6, Name = "Lanyard V.1", Category = "Lanyards", SubCategory = "All", Price = 80.00m, ImageUrl = "/images/lanyard_v1.png" }
            );

            modelBuilder.Entity<Student>().HasData(
                new Student { Id = 1, SchoolId = "2026-0001", BirthDate = "2004-01-01", WalletBalance = 15.00m, RewardPoints = 220 }
            );
        }
    }
}