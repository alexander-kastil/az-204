using FoodApp;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

public static class AppBuilder
{
    // Builder
    public static AppConfig AddConfig(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
        return builder.Configuration.Get<AppConfig>();
    }

    public static void AddEndpointsApiExplorer(this WebApplicationBuilder builder, string title)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = title, Version = "v1" });
        });
    }

    public static void AddApplicationInsights(this WebApplicationBuilder builder){
        builder.Services.AddSingleton<ITelemetryInitializer, FoodTelemetryInitializer>();
        builder.Services.AddApplicationInsightsTelemetry();
        builder.Services.AddSingleton<AILogger>();
    }

    public static void AddNoCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
    }

    // App
    public static void UseSwaggerUI(this WebApplication app, string title)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", title);
            c.RoutePrefix = string.Empty;
        });
    }

    public static void UseDaprPubSub(this WebApplication app)
    {
        app.UseCloudEvents();
        app.MapSubscribeHandler();
    }
    
    public static void UseNoCors(this WebApplication app)
    {
        app.UseCors("AllowAll");
    }
}