using System;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using FoodApp;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
IConfiguration Configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(Configuration);
var cfg = Configuration.Get<AppConfig>();

// Application insights
builder.Services.AddApplicationInsightsTelemetry();
builder.Services.AddSingleton<AILogger>();

// Connection String
string conString = cfg.FoodCatalogApi.UseSQLite ? cfg.FoodCatalogApi.ConnectionStrings.SQLiteDBConnection : cfg.FoodCatalogApi.ConnectionStrings.SQLServerConnection;

if (cfg.FoodCatalogApi.UseManagedIdentity)
{
    Console.WriteLine($"Using KeyVault: {cfg.Azure.KeyVault}");
    var client = new SecretClient(new Uri(cfg.Azure.KeyVault), new DefaultAzureCredential());

    if (cfg.FoodCatalogApi.UseSQLite)
    {
        conString = client.GetSecret("conSQLite").Value?.Value;
    }
    else
    {
        conString = client.GetSecret("conSQLServer").Value?.Value;
    }
}

//Database
if (cfg.FoodCatalogApi.UseSQLite)
{
    builder.Services.AddDbContext<FoodDBContext>(options => options.UseSqlite(conString));
}
else
{
    builder.Services.AddDbContext<FoodDBContext>(opts => opts.UseSqlServer(conString));
}

//Microsoft Identity auth
var az = Configuration.GetSection("Azure");
if (cfg.FoodCatalogApi.AuthEnabled && az != null)
{
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(az)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();
    builder.Services.AddAuthorization();

    //Add auth policy instead of Authorize Attribute on Controllers
    builder.Services.AddControllers(obj =>
    {
        var policy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
        obj.Filters.Add(new AuthorizeFilter(policy));
    });
}
else
{
    builder.Services.AddControllers();
}

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
    c.SwaggerDoc("v1", new OpenApiInfo { Title = cfg.FoodCatalogApi.Title, Version = "v1" });
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
    c.SwaggerEndpoint("/swagger/v1/swagger.json", cfg.FoodCatalogApi.Title);
    c.RoutePrefix = string.Empty;
});

//Cors and Routing
app.UseCors("nocors");
app.UseHttpsRedirection();

//Set Authorize Attribute on Controllers using a policy
if (cfg.FoodCatalogApi.AuthEnabled)
{
    Console.WriteLine($"Using auth with App Reg: {cfg.Azure.AppReg.ClientId}");
    app.UseAuthentication();
    app.UseAuthorization();
}

app.MapControllers();
app.Run();