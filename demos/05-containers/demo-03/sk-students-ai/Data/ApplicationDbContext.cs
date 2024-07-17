using System.Globalization;
using CsvHelper;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SemanticKernel.FunctionCalling;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        DBInitializer.Initialize(this);
    }
    public DbSet<Student> Students { get; set; }
   
}
