using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace MSALDaemon
{
    public class Startup
    {
        private readonly IWebHostEnvironment env;
        private readonly IConfiguration config;

        //args are dependency injection
        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            this.env = environment;
            this.config = configuration;
        }
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //Config
            var cfgBuilder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json");
            var configuration = cfgBuilder.Build();
            services.Configure<AppConfig>(configuration);
            services.AddSingleton(typeof(IConfigurationRoot), configuration);
            services.AddControllers();

            //Swagger
            services.AddSwaggerGen (c => {
                c.SwaggerDoc ("v1", new OpenApiInfo { Title = "MSAL Daemon Service", Version = "v1" });
            });

            // Cors
            services.AddCors (options => {
                options.AddPolicy ("allowAll",
                    builder => builder
                    .SetIsOriginAllowed (host => true)
                    .AllowAnyMethod ()
                    .AllowAnyHeader ()
                    .AllowCredentials ());
            });

            services.AddControllers ();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Swagger
            app.UseSwagger ();
            app.UseSwaggerUI (c => {
                c.SwaggerEndpoint ("/swagger/v1/swagger.json", "Daemonapp");
                c.RoutePrefix = string.Empty;
            });

            //Cors
            app.UseCors ("allowAll");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}