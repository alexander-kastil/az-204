using Microsoft.EntityFrameworkCore;

namespace CosmosEF
{
    public class FoodCosmosDbContext : DbContext
    {
        string conStr = "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

        string dbname = "fooddb";

        public DbSet<FoodItem> FoodItems { get; set; }
    
        public FoodCosmosDbContext(DbContextOptions<FoodCosmosDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseCosmos(conStr, databaseName: dbname);
    }
}