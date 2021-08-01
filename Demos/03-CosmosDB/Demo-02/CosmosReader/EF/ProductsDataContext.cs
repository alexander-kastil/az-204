using Microsoft.Azure.Cosmos;
using Microsoft.EntityFrameworkCore;

namespace CosmosReader {
    public class ProductCosmosDbContext : DbContext
    {
        private string key;
        private string ep;
        private string db;

        public DbSet<Product> Products { get; set; }
    
        public ProductCosmosDbContext(string endpoint, string acctkey, string database){
            key = acctkey;
            ep = endpoint;
            db = database;
        }

        public ProductCosmosDbContext(DbContextOptions<ProductCosmosDbContext> options)
            : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)  
        {     
            optionsBuilder.UseCosmos(ep, key, db);  
        }  
   
        protected override void OnModelCreating(ModelBuilder modelBuilder)  
        {  
            
        }  
    }
}