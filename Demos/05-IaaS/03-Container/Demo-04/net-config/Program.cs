using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

// Configure Services
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// var env = Environment.GetEnvironmentVariable("App__UseEnv");
// if(env=="true"){
//     builder.Configuration.AddEnvironmentVariables();
// }

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(o => o.AddPolicy("nocors", builder =>
{
    builder
        .SetIsOriginAllowed(host => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
}));

// Open Api
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("nocors");
app.UseSwagger();

app.UseHttpsRedirection();

app.UseAuthorization(); 

app.MapControllers();

app.Run();
