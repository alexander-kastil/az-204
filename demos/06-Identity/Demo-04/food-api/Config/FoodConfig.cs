using System;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace FoodApp
{
    public class FoodConfig    {
        public AppConfig App { get; set; } 
        public Azure Azure { get; set; } 
        public Logging Logging { get; set; } 

         public static FoodConfig GetMergedConfigWithEnv(IConfiguration Configuration)
        {
            var cfg = Configuration.Get<FoodConfig>();
            var env = Environment.GetEnvironmentVariable("FOODAPP_USE_ENV");
            if (bool.Parse(env))
            {
                cfg.App = MergeEnvSection<FoodApp.AppConfig>(cfg, "FOODAPP_APP");
                cfg.Azure = MergeEnvSection<FoodApp.Azure>(cfg, "FOODAPP_AZURE");
            }
            return cfg;
        }

        private static T MergeEnvSection<T>(FoodConfig cfg, string section)
        {            
            if (Environment.GetEnvironmentVariable(section)!=null)
            {
                return JsonSerializer.Deserialize<T>(Environment.GetEnvironmentVariable(section));
            }
            return default(T);
        }
    }

     public class AppConfig    {
        public bool AuthEnabled { get; set; } 
        public bool UseSQLite {get;set;}
        public bool UseAppConfig {get;set;}
        public ConnectionStrings ConnectionStrings { get; set; } 
    }

    public class ConnectionStrings    {
        public string SQLiteDBConnection { get; set; } 
        public string SQLServerConnection { get; set; } 
    }
    
    public class Azure    {
        public string TenantId { get; set; } 
        public string ClientId { get; set; } 
        public string Instance {get;set;}
        public string cacheLocation { get; set; } 
        public string ApplicationInsights { get; set; } 
        public string AppConfiguration { get; set; } 
        public string KeyVault { get; set; } 
    }    
    
    public class LogLevel    {
        public string Default { get; set; } 
        public string Microsoft { get; set; }     
    }

    public class Logging    {
        public LogLevel LogLevel { get; set; } 
    }
}