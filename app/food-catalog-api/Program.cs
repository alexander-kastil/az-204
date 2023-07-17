using System;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using FoodApi;
using FoodApp;
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


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
IConfiguration Configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(Configuration);
var cfg = Configuration.Get<FoodConfig>();

// App insights using Feature Flag
if (cfg.FeatureManagement.UseApplicationInsights)
{
    builder.Services.AddApplicationInsightsTelemetry();
    builder.Services.AddSingleton<AILogger>();
}

//Database
if (cfg.App.UseSQLite)
{
    string dbconstring = cfg.App.ConnectionStrings.SQLiteDBConnection;

    if (cfg.FeatureManagement.UseKeyVaultWithMI)
    {
        var client = new SecretClient(new Uri($"https://{cfg.Azure.KeyVault}"), new DefaultAzureCredential());
        dbconstring =  client.GetSecret("conSQLite").Value?.Value;     
        Console.WriteLine($"Using SQLLite with connection string from KeyVault: {dbconstring}");
    }
    else
    {
        Console.WriteLine($"Using SQLite with connection string: {dbconstring}");
    }

    builder.Services.AddDbContext<FoodDBContext>(options => options.UseSqlite(dbconstring));
}
else
{
    Console.WriteLine("Using SQL Server");
    builder.Services.AddDbContext<FoodDBContext>(opts => opts.UseSqlServer(cfg.App.ConnectionStrings.SQLServerConnection));
}

//Microsoft Identity auth
var az = Configuration.GetSection("Azure");
if (cfg.App.AuthEnabled && az != null)
{
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(az)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();
    builder.Services.AddAuthorization();

    //Add auth policy instead of Autorize Attribute on Controllers
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
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Food-Catalog-Api", Version = "v1" });
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
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Food-Api");
    c.RoutePrefix = string.Empty;
});

//Cors and Routing
app.UseCors("nocors");
app.UseHttpsRedirection();

//Set Authorize Attribute on Controllers using a policy
if (cfg.App.AuthEnabled)
{
    Console.WriteLine($"Using auth with App Reg: {cfg.Azure.ClientId}");
    app.UseAuthentication();
    app.UseAuthorization();
}

app.MapControllers();
app.Run();