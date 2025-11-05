using Microsoft.EntityFrameworkCore;

namespace SKFunctionCalling;

public class Utils
{
  public static string GetConfigValue(string config)
  {
    IConfigurationBuilder builder = new ConfigurationBuilder();
    if (System.IO.File.Exists("appsettings.json"))
      builder.AddJsonFile("appsettings.json", false, true);
    if (System.IO.File.Exists("appsettings.Development.json"))
      builder.AddJsonFile("appsettings.Development.json", false, true);
    IConfigurationRoot root = builder.Build();
    return root[config]!;
  }

  public static ApplicationDbContext GetDbContext()
  {
    var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
    var connStr = Utils.GetConfigValue("ConnectionStrings:DefaultConnection");
    optionsBuilder.UseSqlite(connStr);
    ApplicationDbContext db = new ApplicationDbContext(optionsBuilder.Options);
    return db;
  }
}