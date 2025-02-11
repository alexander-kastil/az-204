using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using FoodApi;

var builder = WebApplication.CreateBuilder(args);

// Register configuration and services previously in Startup.cs
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
var cfg = builder.Configuration.Get<FoodConfig>();

Console.WriteLine($"Using KeyVault: {cfg.Azure.KevVault}");
var client = new SecretClient(new Uri($"https://{cfg.Azure.KevVault}"), new DefaultAzureCredential());
var secret = client.GetSecret("conSQLite").Value;
Console.WriteLine($"dbconstring from vault: {secret.Value}");

builder.Services.AddDbContext<FoodDBContext>(options => options.UseSqlite(secret.Value));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Food API", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("allowAll", policy =>
        policy.SetIsOriginAllowed(host => true)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

builder.Services.AddControllers();
// ...any other existing service registrations...

var app = builder.Build();

// Middleware pipeline configuration (from Startup.Configure)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Food API");
    c.RoutePrefix = string.Empty;
});

app.UseCors("allowAll");

app.UseHttpsRedirection();

app.UseRouting();
app.MapControllers();
// ...existing middleware code...

app.Run();