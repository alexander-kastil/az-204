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
            list.Add(new FoodItem { ID = 1, Name = "Butter Chicken", Amount = 12, Code = "btc", Date = DateTime.Now });
            list.Add(new FoodItem { ID = 2, Name = "Blini with Salmon", Amount = 9, Code = "bls", Date = DateTime.Now });
            list.Add(new FoodItem { ID = 3, Name = "Wiener Schnitzel", Amount = 18, Code = "ws",Date = DateTime.Now });
            modelBuilder.Entity<FoodItem>().HasData(list.ToArray());
        }
    }
}