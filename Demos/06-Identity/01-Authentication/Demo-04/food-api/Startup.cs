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

            //Aplication Insights
            services.AddApplicationInsightsTelemetry(Configuration["Azure:ApplicationInsights"]);
            services.AddSingleton<ITelemetryInitializer, FoodTelemetryInitializer>();
            services.AddSingleton<AILogger>();

            //EF
            bool sqlite = bool.Parse(Configuration["App:UseSQLite"]);
            if (sqlite)
            {
                var conStrLite = Configuration["App:ConnectionStrings:SQLiteDBConnection"];
                services.AddEntityFrameworkSqlite().AddDbContext<FoodDBContext>(options => options.UseSqlite(conStrLite));
            }
            else
            {
                var conStr = Configuration["App:ConnectionStrings:SQLServerConnection"];
                services.AddEntityFrameworkSqlServer()
                .AddDbContext<FoodDBContext>(options => options.UseSqlServer(conStr));
            }

            var cfg = Configuration.GetSection("AzureAd");

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(Configuration)
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
            services.AddCors(o => o.AddPolicy("default", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials()
                       .WithOrigins(domains);
            }));

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

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
            app.UseCors("default");
            app.UseHttpsRedirection();
            app.UseRouting();

            if (Boolean.Parse(Configuration["App:AuthEnabled"]))
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