using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.CatalogService
{
    //To manage Migrations & create the DB go to console:
    //Add EF Core Tools: dotnet tool install --global dotnet-ef
    //dotnet restore
    //dotnet-ef migrations add MIGRATION-NAME
    //dotnet-ef database update

    public class FoodCatalogDBContext : DbContext 
    {
        public FoodCatalogDBContext(DbContextOptions<FoodCatalogDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<FoodItem> Food { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            List<FoodItem> list = new List<FoodItem>();
            list.Add(new FoodItem { ID = 1, Name = "Butter Chicken", BasePrice = 12, Code = "btc", StockAmount = 43 });
            list.Add(new FoodItem { ID = 2, Name = "Blini with Salmon", BasePrice = 9, Code = "bls",StockAmount = 22});
            list.Add(new FoodItem { ID = 3, Name = "Wiener Schnitzel", BasePrice = 18, Code = "ws", StockAmount = 55 });
            modelBuilder.Entity<FoodItem>().HasData(list.ToArray());
        }
    }
}