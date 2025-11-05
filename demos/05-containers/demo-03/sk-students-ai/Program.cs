using Microsoft.EntityFrameworkCore;
using SKFunctionCalling;
using Microsoft.SemanticKernel;

var builder = WebApplication.CreateBuilder(args);

// Read configuration from appsettings.json
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Get Azure OpenAI configuration values directly
var model = builder.Configuration["Model"] ?? throw new InvalidOperationException("Model configuration is missing");
var endpoint = builder.Configuration["Endpoint"] ?? throw new InvalidOperationException("Endpoint configuration is missing");
var apiKey = builder.Configuration["ApiKey"] ?? throw new InvalidOperationException("ApiKey configuration is missing");

var kernelBuilder = Kernel.CreateBuilder();
kernelBuilder.Services.AddAzureOpenAIChatCompletion(
    model,
    endpoint,
    apiKey);
kernelBuilder.Services.AddLogging(c => c.AddDebug().SetMinimumLevel(LogLevel.Trace));
kernelBuilder.Plugins.AddFromType<StudentPlugin>();
var kernel = kernelBuilder.Build();

// Update Semantic Kernel registration. The kernel will be used in Index.cshtml.cs
builder.Services.AddSingleton(kernel);

// Add services to the container.
builder.Services.AddRazorPages();

// Add Entity Framework Core with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapRazorPages()
   .WithStaticAssets();

app.Run();