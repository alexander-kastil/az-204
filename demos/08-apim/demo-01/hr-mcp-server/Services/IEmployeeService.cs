namespace HRMCPServer.Services;

/// <summary>
/// Interface for managing employee data operations
/// </summary>
public interface IEmployeeService
{
    /// <summary>
    /// Gets all employees
    /// </summary>
    /// <returns>A list of all employees</returns>
    Task<List<Employee>> GetAllEmployeesAsync();

    /// <summary>
    /// Adds a new employee to the collection
    /// </summary>
    /// <param name="employee">The employee to add</param>
    /// <returns>True if added successfully, false if employee with same email already exists</returns>
    Task<bool> AddEmployeeAsync(Employee employee);

    /// <summary>
    /// Updates an existing employee by email
    /// </summary>
    /// <param name="email">Email of the employee to update</param>
    /// <param name="updateAction">Action to perform the update</param>
    /// <returns>True if employee was found and updated, false otherwise</returns>
    Task<bool> UpdateEmployeeAsync(string email, Action<Employee> updateAction);

    /// <summary>
    /// Removes an employee by email
    /// </summary>
    /// <param name="email">Email of the employee to remove</param>
    /// <returns>True if employee was found and removed, false otherwise</returns>
    Task<bool> RemoveEmployeeAsync(string email);

    /// <summary>
    /// Searches for employees based on a search term
    /// </summary>
    /// <param name="searchTerm">The term to search for</param>
    /// <returns>A list of matching employees</returns>
    Task<List<Employee>> SearchEmployeesAsync(string searchTerm);
}
