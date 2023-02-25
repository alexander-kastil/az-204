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
            list.Add(new FoodItem { ID = 1, Name = "Butter Chicken", InStock = 9, Price = 12, Code = "btc", PictureUrl ="assets/images/falaffel.jpg", Description = "Butter Chicken is a dish of chicken in a spiced curry sauce. It is a dish of the Indian subcontinent originating in the Punjab region. It is popular in India, Pakistan, the United Kingdom, Canada, the United States, and Australia."});
            list.Add(new FoodItem { ID = 2, Name = "Blini with Salmon", InStock = 12, Price = 9, Code = "bls", PictureUrl ="assets/images/falaffel.jpg", Description = "Blinis are mini pancakes that make perfect finger food for passing around at a party. Top with dill crème fraîche and smoked salmon for a timeless, elegant canapé that never fails to impress" });
            list.Add(new FoodItem { ID = 3, Name = "Wiener Schnitzel", InStock= 23, Price = 18, Code = "ws" , PictureUrl ="assets/images/falaffel.jpg", Description = "Wiener schnitzel is a veal cutlet that has been pounded thin, breaded, and pan-fried. It is a traditional Austrian dish that is popular throughout Central Europe and is often served with a lemon wedge and a side of French fries."});
            modelBuilder.Entity<FoodItem>().HasData(list.ToArray());
        }
    }
}