using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace HRMCPServer.Data;

public static class EmployeeDbInitializer
{
    public static async Task InitializeAsync(IServiceProvider services, CancellationToken cancellationToken = default)
    {
        using var scope = services.CreateScope();
        var scopedServices = scope.ServiceProvider;

        var logger = scopedServices.GetRequiredService<ILoggerFactory>()
            .CreateLogger(typeof(EmployeeDbInitializer));
        var context = scopedServices.GetRequiredService<EmployeeDbContext>();
        await context.Database.EnsureCreatedAsync(cancellationToken);

        if (await context.Employees.AnyAsync(cancellationToken))
        {
            logger.LogInformation("Employee database already contains data; skipping seed.");
            return;
        }

        var seedEmployees = GetSeedEmployees();

        await context.Employees.AddRangeAsync(seedEmployees, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Seeded {Count} employees into the database.", seedEmployees.Count);
    }

    private static List<Employee> GetSeedEmployees() => new()
    {
        new Employee
        {
            FirstName = "Carlos",
            LastName = "Gomez",
            Email = "carlos.gomez@restaurant.com",
            SpokenLanguages = new List<string> { "Spanish", "English", "French" },
            Skills = new List<string> { "Sous Chef", "Menu Planning", "Food Safety", "Inventory Management" },
            CurrentRole = "Sous Chef"
        },
        new Employee
        {
            FirstName = "Marie",
            LastName = "Dubois",
            Email = "marie.dubois@restaurant.com",
            SpokenLanguages = new List<string> { "French", "English", "Italian" },
            Skills = new List<string> { "Pastry Chef", "Dessert Creation", "Baking", "Team Leadership" },
            CurrentRole = "Pastry Chef"
        },
        new Employee
        {
            FirstName = "Luca",
            LastName = "Rossi",
            Email = "luca.rossi@restaurant.com",
            SpokenLanguages = new List<string> { "Italian", "English", "Spanish" },
            Skills = new List<string> { "Head Waiter", "Customer Service", "Wine Pairing", "Table Management" },
            CurrentRole = "Head Waiter"
        },
        new Employee
        {
            FirstName = "Anna",
            LastName = "Schmidt",
            Email = "anna.schmidt@restaurant.com",
            SpokenLanguages = new List<string> { "German", "English", "Russian" },
            Skills = new List<string> { "Restaurant Manager", "Staff Scheduling", "Budgeting", "Event Coordination" },
            CurrentRole = "Restaurant Manager"
        },
        new Employee
        {
            FirstName = "Sofia",
            LastName = "Fernandez",
            Email = "sofia.fernandez@restaurant.com",
            SpokenLanguages = new List<string> { "Portuguese", "Spanish", "English" },
            Skills = new List<string> { "Bartender", "Mixology", "Inventory Control", "Customer Engagement" },
            CurrentRole = "Bartender"
        },
        new Employee
        {
            FirstName = "Kenji",
            LastName = "Tanaka",
            Email = "kenji.tanaka@restaurant.com",
            SpokenLanguages = new List<string> { "Japanese", "English", "Mandarin" },
            Skills = new List<string> { "Sushi Chef", "Knife Skills", "Seafood Preparation", "Quality Control" },
            CurrentRole = "Sushi Chef"
        },
        new Employee
        {
            FirstName = "Olga",
            LastName = "Ivanova",
            Email = "olga.ivanova@restaurant.com",
            SpokenLanguages = new List<string> { "Russian", "English", "German" },
            Skills = new List<string> { "Hostess", "Reservation Management", "Multilingual Communication", "Conflict Resolution" },
            CurrentRole = "Hostess"
        },
        new Employee
        {
            FirstName = "Ahmed",
            LastName = "Hassan",
            Email = "ahmed.hassan@restaurant.com",
            SpokenLanguages = new List<string> { "Arabic", "English", "French" },
            Skills = new List<string> { "Grill Chef", "Meat Preparation", "Kitchen Safety", "Teamwork" },
            CurrentRole = "Grill Chef"
        },
        // --- Additional service/waiter employees ---
        new Employee
        {
            FirstName = "Julia",
            LastName = "Müller",
            Email = "julia.mueller@restaurant.com",
            SpokenLanguages = new List<string> { "German", "English" },
            Skills = new List<string> { "Waitress", "Customer Service", "Order Taking", "Teamwork" },
            CurrentRole = "Waitress"
        },
        new Employee
        {
            FirstName = "Pedro",
            LastName = "Silva",
            Email = "pedro.silva@restaurant.com",
            SpokenLanguages = new List<string> { "Portuguese", "English", "Spanish" },
            Skills = new List<string> { "Waiter", "Table Service", "Upselling", "Problem Solving" },
            CurrentRole = "Waiter"
        },
        new Employee
        {
            FirstName = "Emily",
            LastName = "Johnson",
            Email = "emily.johnson@restaurant.com",
            SpokenLanguages = new List<string> { "English", "French" },
            Skills = new List<string> { "Waitress", "Food Delivery", "Guest Relations", "Attention to Detail" },
            CurrentRole = "Waitress"
        },
        new Employee
        {
            FirstName = "Mateo",
            LastName = "Garcia",
            Email = "mateo.garcia@restaurant.com",
            SpokenLanguages = new List<string> { "Spanish", "English" },
            Skills = new List<string> { "Waiter", "Order Management", "Customer Service", "Teamwork" },
            CurrentRole = "Waiter"
        },
        new Employee
        {
            FirstName = "Sara",
            LastName = "Bianchi",
            Email = "sara.bianchi@restaurant.com",
            SpokenLanguages = new List<string> { "Italian", "English" },
            Skills = new List<string> { "Service Staff", "Table Setup", "Guest Assistance", "Multitasking" },
            CurrentRole = "Service Staff"
        }
    };
}
