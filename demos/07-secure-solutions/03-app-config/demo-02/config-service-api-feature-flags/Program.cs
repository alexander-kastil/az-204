using System;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.FeatureManagement;

var builder = WebApplication.CreateBuilder(args);

// Access Base Configuration
IConfiguration Configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(Configuration);
AppConfig cfg = Configuration.Get<AppConfig>();

builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect(cfg.Settings.AppConfigConnection)
        .UseFeatureFlags()
        .ConfigureKeyVault(kv =>
        {
            kv.SetCredential(new DefaultAzureCredential());
        })
        .Select("*", cfg.Settings.Environment)
        .ConfigureRefresh(refreshOptions =>
            refreshOptions.Register("Settings:Sentinel", refreshAll: true));
});

// Add services to the container.
// Key Vault Client
var client = new SecretClient(new Uri($"https://{cfg.Settings.KeyVault}"), new DefaultAzureCredential());
builder.Services.AddSingleton<SecretClient>(client);

// Feature Management
builder.Services.AddFeatureManagement();

builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "App-Config-Api", Version = "v1" });
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
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "App-Config-Service-Api");
    c.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
