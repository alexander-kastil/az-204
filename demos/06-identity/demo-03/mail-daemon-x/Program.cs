using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using FoodApp.MailDeamon;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
IConfiguration Configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(Configuration);
var cfg = Configuration.Get<AppConfig>();


builder.Services.AddControllers();

// Swaggger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MSAL Daemon", Version = "v1" });
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

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MSAL Daemon");
    c.RoutePrefix = string.Empty;
});

//Cors and Routing
app.UseCors("nocors");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
