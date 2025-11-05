namespace HRMCPServer;

/// <summary>
/// Configuration settings for the HR MCP Server
/// </summary>
public class HRMCPServerConfiguration
{
    public const string SectionName = "HRMCPServer";
    
    /// <summary>
    /// The path of the employees file for HR MCP Server
    /// </summary>
    public string EmployeesPath { get; set; } = string.Empty;
}
