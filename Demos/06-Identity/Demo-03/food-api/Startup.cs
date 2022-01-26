using System;
using FoodApp;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

namespace FoodApi
{
    public class Startup
    {

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Configuration = configuration;
            env = environment;
        }

        public IConfiguration Configuration { get; }

        private readonly IWebHostEnvironment env;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Configuration);
            var cfg = Configuration.Get<FoodConfig>();

            //Aplication Insights
            services.AddApplicationInsightsTelemetry(cfg.Azure.ApplicationInsights);
            services.AddSingleton<ITelemetryInitializer, FoodTelemetryInitializer>();
            services.AddSingleton<AILogger>();

            //Database
            if (cfg.App.UseSQLite)
            {
                services.AddDbContext<FoodDBContext>(opts => opts.UseSqlite(cfg.App.ConnectionStrings.SQLiteDBConnection));
            }
            else
            {
                services.AddDbContext<FoodDBContext>(opts => opts.UseSqlServer(cfg.App.ConnectionStrings.SQLiteDBConnection));
            }

            //Auth
            var az = Configuration.GetSection("Azure");
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(az)
                .EnableTokenAcquisitionToCallDownstreamApi()
                .AddInMemoryTokenCaches();
            services.AddAuthorization();

            //Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Food API", Version = "v1" });
            });
            services.AddControllers();

            //TODO: move domain to config
            string corsDomains = "http://localhost:4200";
            string[] domains = corsDomains.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            // Cors
             services.AddCors(o => o.AddPolicy("nocors", builder =>
            {
                builder
                    .SetIsOriginAllowed(host => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            }));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var cfg = Configuration.Get<FoodConfig>();
            Console.WriteLine("Environment: " + env.EnvironmentName);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Food API");
                c.RoutePrefix = string.Empty;
            });

            //Cors and Routing
            app.UseCors("nocors");
            app.UseHttpsRedirection();
            app.UseRouting();

            if (cfg.App.AuthEnabled)
            {
                app.UseAuthentication();
                app.UseAuthorization();
            }

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}