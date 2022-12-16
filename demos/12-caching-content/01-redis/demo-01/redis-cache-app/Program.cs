using System.Security.AccessControl;
using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using StackExchange.Redis;


IConfiguration config = new ConfigurationBuilder()   
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();   

// See https://aka.ms/new-console-template for more information
Lazy<ConnectionMultiplexer> conRedis = new Lazy<ConnectionMultiplexer>(() =>
{
    var conStr = config["RedisConnection"];
    return ConnectionMultiplexer.Connect(conStr);
});

IDatabase cache = conRedis.Value.GetDatabase();

// Simple PING command
string cacheCommand = "PING";
Console.WriteLine("\nCache command  : " + cacheCommand);
Console.WriteLine("Cache response : " + cache.Execute(cacheCommand).ToString());

// Simple get and put of integral data types into the cache
cacheCommand = "GET Message";
Console.WriteLine("\nCache command  : " + cacheCommand + " or StringGet()");
Console.WriteLine("Cache response : " + cache.StringGet("Message").ToString());

cacheCommand = "SET Message \"Hello! The cache is working from a .NET Core console app!\"";
Console.WriteLine("\nCache command  : " + cacheCommand + " or StringSet()");
Console.WriteLine("Cache response : " + cache.StringSet("Message", "Hello! The cache is working from a .NET Core console app!").ToString());

// Demonstrate "SET Message" executed as expected...
cacheCommand = "GET Message";
Console.WriteLine("\nCache command  : " + cacheCommand + " or StringGet()");
Console.WriteLine("Cache response : " + cache.StringGet("Message").ToString());

// Get the client list, useful to see if connection list is growing...
cacheCommand = "CLIENT LIST";
Console.WriteLine("\nCache command  : " + cacheCommand);
Console.WriteLine("Cache response : \n" + cache.Execute("CLIENT", "LIST").ToString().Replace("id=", "id="));

conRedis.Value.Dispose();
