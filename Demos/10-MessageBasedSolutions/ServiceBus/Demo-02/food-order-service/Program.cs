using FoodApp.Common;
using FoodApp.OrderService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container -> Configure Services in Startup.cs
var cfg = builder.Configuration.Get<FoodConfig>();

// Service Bus
builder.Services.Configure<ServiceBusConfig>(builder.Configuration.GetSection("ServiceBusConfig")));

// Entity Framework
builder.Services.AddDbContext<FoodOrderDBContext>(opts => opts.UseSqlite(cfg.App.ConnectionStrings.SQLiteDBConnection));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline -> Configure in Startup.cs
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
