using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FoodApp
{
    //To manage Migrations & create the DB go to console:
    //Add EF Core Tools: dotnet tool install --global dotnet-ef
    //dotnet restore
    //dotnet-ef migrations add MIGRATION-NAME
    //dotnet-ef database update

    public class FoodDBContext : DbContext 
    {
        public FoodDBContext(DbContextOptions<FoodDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<CatalogItem> Food { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
                modelBuilder.Entity<CatalogItem>()
                    .Property(p => p.Price)
                    .HasColumnType("decimal(18,4)");

            List<CatalogItem> list = new List<CatalogItem>
            {
                new CatalogItem { ID = 1, Name = "Butter Chicken", InStock = 9, Price = 12 },
                new CatalogItem { ID = 2, Name = "Pad Kra Pao", InStock = 12, Price = 9 },
                new CatalogItem { ID = 3, Name = "Wiener Schnitzel", InStock = 23, Price = 18 }
            };           
            modelBuilder.Entity<CatalogItem>().HasData(list.ToArray());
        }
    }
}