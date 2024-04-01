using Microsoft.EntityFrameworkCore;

public class FoodDbContext : DbContext
    {
        private string key;
        private string ep;
        private string db;

        public DbSet<Food> Food { get; set; }
    
        public FoodDbContext(string endpoint, string acctkey, string database){
            key = acctkey;
            ep = endpoint;
            db = database;
        }

        public FoodDbContext(DbContextOptions<FoodDbContext> options)
            : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)  
        {     
            optionsBuilder.UseCosmos(ep, key, db);  
        }  
   
        protected override void OnModelCreating(ModelBuilder modelBuilder)  
        {  
            
        }  
    }