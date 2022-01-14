using System;
using FoodApp;
using Microsoft.ApplicationInsights.Extensibility;
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

            //Database
            bool useSQLite = bool.Parse(Configuration["App:UseSQLite"]);
            if (useSQLite)
            {
                var conStrLite = Configuration["App:ConnectionStrings:SQLiteDBConnection"];
                services.AddDbContext<FoodDBContext>(options => options.UseSqlite(conStrLite));
            }
            else
            {
                var conStr = Configuration["App:ConnectionStrings:SQLServerConnection"];
                services.AddDbContext<FoodDBContext>(options => options.UseSqlServer(conStr));
            }

            //Microsoft Identity auth
            var cfg = Configuration.GetSection("Azure");
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(Configuration)
                .EnableTokenAcquisitionToCallDownstreamApi()
                .AddInMemoryTokenCaches();
            services.AddAuthorization();

            //Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Food-API", Version = "v1" });
            });
            services.AddControllers();

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
            Console.WriteLine($"Use environment: {env.EnvironmentName}");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Food-API");
                c.RoutePrefix = string.Empty;
            });

            //Cors and Routing
            app.UseCors("nocors");
            app.UseHttpsRedirection();
            app.UseRouting();

            //Auth -> Uncomment [Authorize] and Scope related info in FoodController if true
            var useAuth = Boolean.Parse(Configuration["App:AuthEnabled"]);
            Console.WriteLine($"Use auth: {useAuth}");
            if (useAuth)
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