using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

// overriding config with env vars works by default in Azure Functions
// just to demonstrate on how to get more control over the config
[assembly: FunctionsStartup(typeof(Integrations.Startup))]
namespace Integrations
{
    internal class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configuration = BuildConfiguration(builder.GetContext().ApplicationRootPath);
        }

        private IConfiguration BuildConfiguration(string applicationRootPath)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(applicationRootPath)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)                    
                .AddEnvironmentVariables()
                .Build();

            return config;
        }
    }
}