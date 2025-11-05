using System.ComponentModel;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ModelContextProtocol.Server;
using HRMCPServer.Services;

namespace HRMCPServer;

/// <summary>
/// Provides HR management tools for the MCP server.
/// Loads employee data from a JSON file on startup and maintains it in memory.
/// All modifications are temporary and reset when the server restarts.
/// </summary>
[McpServerToolType]
internal class HRTools
{
    private readonly IEmployeeService _employeeService;
    private readonly ILogger<HRTools> _logger;

    public HRTools(
        IEmployeeService employeeService,
        ILogger<HRTools> logger)
    {
        _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [McpServerTool]
    [Description("Provides the whole list of the employees")]
    public async Task<EmployeeCollection> ListEmployees()
    {
        var employees = await _employeeService.GetAllEmployeesAsync();
        return new EmployeeCollection 
        { 
            Employees = employees 
        };
    }

    [McpServerTool]
    [Description("Adds a new employee to the list")]
    public async Task<string> AddEmployee(
        [Description("First name of the employee")] string firstName,
        [Description("Last name of the employee")] string lastName,
        [Description("Email address of the employee")] string email,
        [Description("Current role of the employee")] string currentRole,
        [Description("Comma-separated list of spoken languages")] string spokenLanguages = "",
        [Description("Comma-separated list of skills")] string skills = "")
    {
        var employee = new Employee
        {
            FirstName = firstName?.Trim() ?? string.Empty,
            LastName = lastName?.Trim() ?? string.Empty,
            Email = email?.Trim() ?? string.Empty,
            CurrentRole = currentRole?.Trim() ?? string.Empty,
            SpokenLanguages = ParseCommaSeparatedString(spokenLanguages),
            Skills = ParseCommaSeparatedString(skills)
        };

        var success = await _employeeService.AddEmployeeAsync(employee);
        
        if (!success)
        {
            return $"Employee with email '{employee.Email}' already exists.";
        }
        
        return $"Successfully added employee: {employee.FullName}";
    }

    [McpServerTool]
    [Description("Updates an existing employee by email")]
    public async Task<string> UpdateEmployee(
        [Description("Email address of the employee to update")] string email,
        [Description("New first name (optional)")] string? firstName = null,
        [Description("New last name (optional)")] string? lastName = null,
        [Description("New current role (optional)")] string? currentRole = null,
        [Description("New comma-separated list of spoken languages (optional)")] string? spokenLanguages = null,
        [Description("New comma-separated list of skills (optional)")] string? skills = null)
    {
        var success = await _employeeService.UpdateEmployeeAsync(email, employee =>
        {
            // Update fields if provided
            if (!string.IsNullOrWhiteSpace(firstName))
                employee.FirstName = firstName.Trim();
            
            if (!string.IsNullOrWhiteSpace(lastName))
                employee.LastName = lastName.Trim();
            
            if (!string.IsNullOrWhiteSpace(currentRole))
                employee.CurrentRole = currentRole.Trim();
            
            if (spokenLanguages != null)
                employee.SpokenLanguages = ParseCommaSeparatedString(spokenLanguages);
            
            if (skills != null)
                employee.Skills = ParseCommaSeparatedString(skills);
        });

        if (!success)
        {
            return $"Employee with email '{email}' not found.";
        }
        
        return $"Successfully updated employee with email: {email}";
    }

    [McpServerTool]
    [Description("Removes an employee by email")]
    public async Task<string> RemoveEmployee(
        [Description("Email address of the employee to remove")] string email)
    {
        var success = await _employeeService.RemoveEmployeeAsync(email);

        if (!success)
        {
            return $"Employee with email '{email}' not found.";
        }
        
        return $"Successfully removed employee with email: {email}";
    }

    [McpServerTool]
    [Description("Searches for employees by name, email, skills, or current role")]
    public async Task<EmployeeCollection> SearchEmployees(
        [Description("Search term to find in employee data")] string searchTerm)
    {
        var matchingEmployees = await _employeeService.SearchEmployeesAsync(searchTerm);
        
        return new EmployeeCollection 
        { 
            Employees = matchingEmployees 
        };
    }

    // Private helper methods
    private static List<string> ParseCommaSeparatedString(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return new List<string>();

        return input.Split(',', StringSplitOptions.RemoveEmptyEntries)
                   .Select(s => s.Trim())
                   .Where(s => !string.IsNullOrEmpty(s))
                   .ToList();
    }
}