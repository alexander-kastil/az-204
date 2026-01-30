using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using FoodApp;

var builder = WebApplication.CreateBuilder(args);
builder.AddConfig();
builder.AddApplicationInsights();
builder.AddFeatureManagement();

// Get app config for local decisions
AppConfig cfg = builder.Configuration.Get<AppConfig>();

// Database
if (cfg.App.UseSQLite)
{
    builder.Services.AddDbContext<FoodDBContext>(options => options.UseSqlite(cfg.App.ConnectionStrings.SQLiteDBConnection));
}
else
{
    builder.Services.AddDbContext<FoodDBContext>(opts => opts.UseSqlServer(cfg.App.ConnectionStrings.SQLServerConnection));
}

// Microsoft Identity auth
if (cfg.App.AuthEnabled)
{
    var az = builder.Configuration.GetSection("Azure");
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

builder.AddEndpointsApiExplorer();
builder.AddNoCors();
var app = builder.Build();

app.UseAzureAppConfiguration();
app.UseSwaggerUI();
app.UseNoCors();

if (cfg.App.AuthEnabled)
{
    Console.WriteLine($"Using auth with App Reg: {cfg.Azure.ClientId}");
    app.UseAuthentication();
    app.UseAuthorization();
}

app.MapControllers();
app.Run();