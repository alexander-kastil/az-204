using System;
using Microsoft.Extensions.Configuration;
using StackExchange.Redis;

namespace RedisSample {
    class Program {
        static void Main (string[] args) {
            
            //dotnet user-secrets set CacheConnection az204-redis-demo-1618.redis.cache.windows.net,abortConnect=false,ssl=true,password="wr988naeX5gM+gPSwJBQGKlQn0idwZJ3LQo++5dfnjE="

            InitializeConfiguration ();

            // Connection refers to a property that returns a ConnectionMultiplexer
            // as shown in the previous example.
            IDatabase cache = lazyConnection.Value.GetDatabase ();

            // Perform cache operations using the cache object...

            // Simple PING command
            string cacheCommand = "PING";
            Console.WriteLine ("\nCache command  : " + cacheCommand);
            Console.WriteLine ("Cache response : " + cache.Execute (cacheCommand).ToString ());

            // Simple get and put of integral data types into the cache
            cacheCommand = "GET Message";
            Console.WriteLine ("\nCache command  : " + cacheCommand + " or StringGet()");
            Console.WriteLine ("Cache response : " + cache.StringGet ("Message").ToString ());

            cacheCommand = "SET Message \"Hello! The cache is working from a .NET Core console app!\"";
            Console.WriteLine ("\nCache command  : " + cacheCommand + " or StringSet()");
            Console.WriteLine ("Cache response : " + cache.StringSet ("Message", "Hello! The cache is working from a .NET Core console app!").ToString ());

            // Demonstrate "SET Message" executed as expected...
            cacheCommand = "GET Message";
            Console.WriteLine ("\nCache command  : " + cacheCommand + " or StringGet()");
            Console.WriteLine ("Cache response : " + cache.StringGet ("Message").ToString ());

            // Get the client list, useful to see if connection list is growing...
            cacheCommand = "CLIENT LIST";
            Console.WriteLine ("\nCache command  : " + cacheCommand);
            Console.WriteLine ("Cache response : \n" + cache.Execute ("CLIENT", "LIST").ToString ().Replace ("id=", "id="));

            lazyConnection.Value.Dispose ();
        }

        private static IConfigurationRoot Configuration { get; set; }
        const string SecretName = "CacheConnection";

        private static void InitializeConfiguration () {
            var builder = new ConfigurationBuilder ()
                .AddUserSecrets<Program> ();

            Configuration = builder.Build ();
        }

        private static Lazy<ConnectionMultiplexer> lazyConnection = new Lazy<ConnectionMultiplexer> (() => {
            string cacheConnection = Configuration[SecretName];
            Console.WriteLine (cacheConnection);
            return ConnectionMultiplexer.Connect (cacheConnection);
        });

        public static ConnectionMultiplexer Connection {
            get {
                return lazyConnection.Value;
            }
        }
    }
}