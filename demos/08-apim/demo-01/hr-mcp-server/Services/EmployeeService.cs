using HRMCPServer.Data;
using Microsoft.EntityFrameworkCore;

namespace HRMCPServer.Services;

/// <summary>
/// Service for managing employee data in memory
/// </summary>
public class EmployeeService : IEmployeeService
{
    private readonly EmployeeDbContext _dbContext;
    private readonly ILogger<EmployeeService> _logger;

    public EmployeeService(
        EmployeeDbContext dbContext,
        ILogger<EmployeeService> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<List<Employee>> GetAllEmployeesAsync()
    {
        return await _dbContext.Employees
            .AsNoTracking()
            .OrderBy(c => c.LastName)
            .ThenBy(c => c.FirstName)
            .ToListAsync();
    }

    public async Task<bool> AddEmployeeAsync(Employee employee)
    {
        if (employee == null)
            throw new ArgumentNullException(nameof(employee));

        var email = employee.Email.Trim();

        if (await _dbContext.Employees.AnyAsync(c => c.Email == email))
        {
            return false;
        }

        employee.Email = email;

        await _dbContext.Employees.AddAsync(employee);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Added new employee: {FullName} ({Email})", employee.FullName, employee.Email);
        return true;
    }

    public async Task<bool> UpdateEmployeeAsync(string email, Action<Employee> updateAction)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email cannot be null or empty", nameof(email));

        if (updateAction == null)
            throw new ArgumentNullException(nameof(updateAction));

        var normalizedEmail = email.Trim();

        var employee = await _dbContext.Employees
            .FirstOrDefaultAsync(c => c.Email == normalizedEmail);

        if (employee == null)
        {
            return false;
        }

        updateAction(employee);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Updated employee with email: {Email}", normalizedEmail);
        return true;
    }

    public async Task<bool> RemoveEmployeeAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email cannot be null or empty", nameof(email));

        var normalizedEmail = email.Trim();

        var employee = await _dbContext.Employees
            .FirstOrDefaultAsync(c => c.Email == normalizedEmail);

        if (employee == null)
        {
            return false;
        }

        _dbContext.Employees.Remove(employee);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Removed employee with email: {Email}", normalizedEmail);
        return true;
    }

    public async Task<List<Employee>> SearchEmployeesAsync(string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return await GetAllEmployeesAsync();
        }

        var searchTermLower = searchTerm.Trim().ToLowerInvariant();

        var employees = await _dbContext.Employees
            .AsNoTracking()
            .ToListAsync();

        var matchingEmployees = employees.Where(c =>
            c.FirstName.ToLowerInvariant().Contains(searchTermLower) ||
            c.LastName.ToLowerInvariant().Contains(searchTermLower) ||
            c.Email.ToLowerInvariant().Contains(searchTermLower) ||
            c.CurrentRole.ToLowerInvariant().Contains(searchTermLower) ||
            c.Skills.Any(skill => skill.ToLowerInvariant().Contains(searchTermLower)) ||
            c.SpokenLanguages.Any(lang => lang.ToLowerInvariant().Contains(searchTermLower))
        ).ToList();

        return matchingEmployees;
    }
}
