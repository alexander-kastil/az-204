using System;
using System.Collections.Generic;
using FoodApp.OrderService;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.OrderService
{
    //To manage Migrations & create the DB go to console:
    //Add EF Core Tools: dotnet tool install --global dotnet-ef
    //dotnet restore
    //dotnet-ef migrations add MIGRATION-NAME
    //dotnet-ef database update

    public class FoodOrderDBContext : DbContext
    {
        public FoodOrderDBContext(DbContextOptions<FoodOrderDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<FoodOrder> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}