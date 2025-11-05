using FoodApp.MailDaemon;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
IConfiguration Configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(Configuration);
var cfg = Configuration.Get<AppConfig>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Graph Mail Daemon", Version = "v1" });
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

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//Cors and Routing
app.UseCors("nocors");

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Graph Mail Daemon");
    c.RoutePrefix = string.Empty;
});

app.MapControllers();
app.Run();
