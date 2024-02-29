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
                new CatalogItem { ID = 1, Name = "Hand pulled Noodles", InStock = 9, Price = 17, PictureUrl="hand-pulled-noodles.png", Description="Hand pulled noodles made with love by our experienced cooks from Sichuan. Served with your choice of meat, vegetables, and smashed cucumber salad." },
                new CatalogItem { ID = 2, Name = "Pad Kra Pao", InStock = 12, Price = 16, PictureUrl="pad-kra-pao.png", Description = "Pad Kra Pao definitely one of the most popular spicy dishes in Thailand. Cooked with thai holy basil, long beans and chicken. Served with jasmine rice and fried egg." },
                new CatalogItem { ID = 3, Name = "Wiener Schnitzel", InStock = 13, Price = 18, PictureUrl="schnitzel.jpg", Description = "Wiener Schnitzel is a traditional Austrian dish consisting of a thin slice of veal coated in breadcrumbs and fried. Served with potato salad and lemon." },
                new CatalogItem { ID = 4, Name = "Falafel Plate", InStock = 9, Price = 12, PictureUrl="falafel.jpg", Description = "Falafel is a deep-fried ball, doughnut or patty made from ground chickpeas. Served with hummus, pita bread, and salad." },
                new CatalogItem { ID = 5, Name = "Pizza Tartufo", InStock = 4, Price = 24, PictureUrl="pizza.jpg", Description = "Pizza truffle is well tasting, exclusive joy for your taste bud. A delight of white pizza where the protagonist is our cheese with truffle flakes." },
            };
            modelBuilder.Entity<CatalogItem>().HasData(list.ToArray());
        }
    }
}