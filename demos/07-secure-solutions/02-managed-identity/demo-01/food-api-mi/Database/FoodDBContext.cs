using System.Collections.Generic;
using System.Linq;
using FoodApi;
using Microsoft.EntityFrameworkCore;

namespace FoodApi
{
    //To manage Migrations & create the DB go to console:
    //[dotnet restore]
    //dotnet ef migrations add MIGRATION-NAME
    //dotnet ef database update

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
            list.Add(new FoodItem { ID = 1, Name = "Butter Chicken", Price = 12, Calories = 1200 });
            list.Add(new FoodItem { ID = 2, Name = "Blini with Salmon", Price = 9, Calories = 900 });
            list.Add(new FoodItem { ID = 3, Name = "Wurstknödel mit Sauerkraut", Price = 8, Calories = 1250 });
            modelBuilder.Entity<FoodItem>().HasData(list.ToArray());
        }
    }
}