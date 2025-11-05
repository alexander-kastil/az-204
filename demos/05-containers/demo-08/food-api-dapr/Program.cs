using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using FoodDapr;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
IConfiguration Configuration = builder.Configuration;
builder.Services.AddSingleton(Configuration);

// EF Core
string conString = Configuration["SQLiteDBConnection"];
builder.Services.AddDbContext<FoodDBContext>(options =>
   {
       options.UseSqlite(conString);
       options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
   }
);

// Dapr
builder.Services.AddDaprClient();

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Food Api Dapr", Version = "v1" });
});

// Cors
builder.Services.AddCors(o => o.AddPolicy("nocors", builder =>
{
    builder
        .SetIsOriginAllowed(host => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Food Api Dapr");
    c.RoutePrefix = string.Empty;
});

//Cors and Routing
app.UseCors("nocors");

app.UseAuthorization();
app.MapControllers();

// Dapr Subscribe Handler used for Pub Sub
app.UseCloudEvents();
app.MapSubscribeHandler();

app.Run();