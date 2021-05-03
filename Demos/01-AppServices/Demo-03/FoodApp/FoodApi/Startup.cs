using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace FoodApi
{
    public class Startup {
        public Startup (IWebHostEnvironment environment, IConfiguration configuration) {
            Configuration = configuration;
            env = environment;
        }

        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment env;
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {

            //Config
            var cfgBuilder = new ConfigurationBuilder ()
                .SetBasePath (env.ContentRootPath)
                .AddJsonFile ("appsettings.json");
            var configuration = cfgBuilder.Build ();
            services.Configure<AppConfig> (configuration);
            services.AddSingleton (typeof (IConfigurationRoot), configuration);

            //EF
            var conStrLite = Configuration["ConnectionStrings:SQLiteDBConnection"];
            services.AddEntityFrameworkSqlite ().AddDbContext<FoodDBContext> (options => options.UseSqlite (conStrLite));

            //AI
            services.AddApplicationInsightsTelemetry (Configuration["Azure:ApplicationInsights:InstrumentationKey"]);

            //Swagger
            services.AddSwaggerGen (c => {
                c.SwaggerDoc ("v1", new OpenApiInfo { Title = "Food API", Version = "v1" });
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

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            //Swagger
            app.UseSwagger ();
            app.UseSwaggerUI (c => {
                c.SwaggerEndpoint ("/swagger/v1/swagger.json", "Food API");
                c.RoutePrefix = string.Empty;
            });

            //Cors
            app.UseCors ("allowAll");

            app.UseHttpsRedirection ();

            app.UseRouting ();

            // app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });
        }
    }
}