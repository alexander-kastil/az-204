using Microsoft.Azure.Cosmos;
using Microsoft.EntityFrameworkCore;

namespace CosmosReader {
    public class ProductCosmosDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
    
        public ProductCosmosDbContext(){}

        public ProductCosmosDbContext(DbContextOptions<ProductCosmosDbContext> options)
            : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)  
        {     
            var accountEndpoint = "https://az204-cosmos-32110.documents.azure.com:443/";  
            var accountKey = "PA2wFBvjmo2lqOhtc8S07zihHTiSYTSVxTYv9xXyOzzfIyQc0WnXqvcyUZCWJtHvNm3WWFzGn1Fa2Rodtr4PEw==";  
            var dbName = "productsdb";  
            optionsBuilder.UseCosmos(accountEndpoint, accountKey, dbName);  
        }  
   
        protected override void OnModelCreating(ModelBuilder modelBuilder)  
        {  
            
        }  
    }
}