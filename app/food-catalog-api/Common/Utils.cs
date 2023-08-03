// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;

// namespace FoodApp
// {
//     public class Utils{
//         public static void addConfiguration(IConfigurationBuilder builder){
//             IConfiguration Configuration = builder.Configuration;
//             builder.Services.AddSingleton<IConfiguration>(Configuration);
//         }

//         public static T getConfiguration<T>(IConfigurationBuilder builder){
//             IConfiguration Configuration = builder.Configuration;
//             return Configuration.Get<T>();
//         }

//         public static void addAppInsights(WebApplicationBuilder builder){
            
//             if (cfg.App.UseApplicationInsights)
//             {
//                 builder.Services.AddApplicationInsightsTelemetry();
//                 builder.Services.AddSingleton<AILogger>();
//             }
//         }
//     }
// }