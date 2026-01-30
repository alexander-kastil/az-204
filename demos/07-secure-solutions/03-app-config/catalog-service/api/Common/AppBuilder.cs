using System;
using Azure.Data.AppConfiguration;
using Azure.Core;
using Azure.Identity;
using FoodApp;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureAppConfiguration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.FeatureManagement;
using Microsoft.OpenApi;
using System.Threading;

public static class AppBuilder
{
    private static bool appConfigProviderLoaded;
    // Builder
    public static void AddConfig(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

        // Add Azure App Configuration with feature flags only if enabled
        var useAppConfig = builder.Configuration.GetValue<bool>("App:UseAppConfig");
        var appConfigEndpoint = builder.Configuration["Azure:AppConfig:Endpoint"];
        var appConfigLabel = builder.Configuration["Azure:AppConfig:Label"];

        if (useAppConfig && !string.IsNullOrEmpty(appConfigEndpoint))
        {
            var tenantId = builder.Configuration.GetValue<string>("Azure:TenantId");
            var appConfigConnectionString = builder.Configuration["Azure:AppConfig:ConnectionString"];

            TokenCredential credential = builder.Environment.IsDevelopment()
                ? new ChainedTokenCredential(
                    new AzureCliCredential(new AzureCliCredentialOptions
                    {
                        TenantId = tenantId,
                        ProcessTimeout = TimeSpan.FromSeconds(5)
                    }),
                    new VisualStudioCredential(new VisualStudioCredentialOptions
                    {
                        TenantId = tenantId
                    }))
                : new ManagedIdentityCredential();

            if (string.IsNullOrWhiteSpace(appConfigConnectionString))
            {
                try
                {
                    using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
                    var context = new TokenRequestContext(new[] { "https://appconfig.azure.com/.default" });
                    credential.GetToken(context, cts.Token);
                }
                catch (Exception ex)
                {
                    appConfigProviderLoaded = false;
                    Console.WriteLine($"Azure App Configuration token acquisition timed out or failed: {ex.Message}");
                    return;
                }
            }

            try
            {
                builder.Configuration.AddAzureAppConfiguration(options =>
                {
                    if (!string.IsNullOrWhiteSpace(appConfigConnectionString))
                    {
                        options.Connect(appConfigConnectionString);
                    }
                    else
                    {
                        options.Connect(new Uri(appConfigEndpoint), credential);
                    }

                    // Load key-values with configured label
                    options.Select(KeyFilter.Any, appConfigLabel);

                    options.UseFeatureFlags(featureFlagOptions =>
                    {
                        // Load feature flags with configured label, refresh every 30 seconds
                        featureFlagOptions.Select(KeyFilter.Any, appConfigLabel);
                        featureFlagOptions.SetRefreshInterval(TimeSpan.FromSeconds(30));
                    });

                    options.ConfigureClientOptions(clientOptions =>
                    {
                        clientOptions.Retry.MaxRetries = 2;
                        clientOptions.Retry.NetworkTimeout = TimeSpan.FromSeconds(5);
                    });
                });
                appConfigProviderLoaded = true;
            }
            catch (Exception ex)
            {
                appConfigProviderLoaded = false;
                Console.WriteLine($"Azure App Configuration disabled: {ex.Message}");
            }
        }
    }

    public static void AddEndpointsApiExplorer(this WebApplicationBuilder builder)
    {
        string title = builder.Configuration.GetValue<string>("title");
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = title, Version = "v1" });
        });
    }

    public static void AddApplicationInsights(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<ITelemetryInitializer, FoodTelemetryInitializer>();
        builder.Services.AddApplicationInsightsTelemetry();
        builder.Services.AddSingleton<AILogger>();
    }

    public static void AddFeatureManagement(this WebApplicationBuilder builder)
    {
        builder.Services.AddFeatureManagement();
        builder.Services.AddAzureAppConfiguration();
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
    public static void UseSwaggerUI(this WebApplication app)
    {
        string title = app.Configuration.GetValue<string>("title");
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", title);
            c.RoutePrefix = string.Empty;
        });
    }

    public static void UseNoCors(this WebApplication app)
    {
        app.UseCors("AllowAll");
    }

    public static void UseAzureAppConfiguration(this WebApplication app)
    {
        // Only use Azure App Configuration middleware if enabled
        var useAppConfig = app.Configuration.GetValue<bool>("App:UseAppConfig");
        if (useAppConfig && appConfigProviderLoaded)
        {
            // Call the actual Azure App Configuration middleware (not recursive)
            ((IApplicationBuilder)app).UseAzureAppConfiguration();
        }
        else if (useAppConfig)
        {
            Console.WriteLine("Azure App Configuration middleware skipped because provider failed to initialize.");
        }
    }
}