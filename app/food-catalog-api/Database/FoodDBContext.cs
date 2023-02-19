using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FoodApi
{
    //To manage Migrations & create the DB go to console:
    //Add EF Core Tools: dotnet tool install --global dotnet-ef
    //dotnet restore
    //dotnet-ef migrations add MIGRATION-NAME
    //dotnet-ef database update

    public class FoodDBContext : DbContext //Use DbContext if not using Identity
    {
        public FoodDBContext(DbContextOptions<FoodDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<FoodItem> Food { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            List<FoodItem> list = new List<FoodItem>();
            list.Add(new FoodItem { ID = 1, Name = "Butter Chicken", InStock = 9, Price = 12, Code = "btc"});
            list.Add(new FoodItem { ID = 2, Name = "Blini with Salmon", InStock = 12, Price = 9, Code = "bls" });
            list.Add(new FoodItem { ID = 3, Name = "Wiener Schnitzel", InStock= 23, Price = 18, Code = "ws" });
            modelBuilder.Entity<FoodItem>().HasData(list.ToArray());
        }
    }
}