using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace HRMCPServer;

/// <summary>
/// Represents an employee in the HR system
/// </summary>
public class Employee
{
    [JsonIgnore]
    public int Id { get; set; }

    /// <summary>
    /// The employee's first name
    /// </summary>
    [JsonPropertyName("firstname")]
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// The employee's last name
    /// </summary>
    [JsonPropertyName("lastname")]
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// The employee's email address
    /// </summary>
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Persisted representation of spoken languages
    /// </summary>
    [JsonIgnore]
    public string SpokenLanguagesData { get; set; } = "[]";

    /// <summary>
    /// List of languages the employee speaks
    /// </summary>
    [NotMapped]
    [JsonPropertyName("spoken_languages")]
    public List<string> SpokenLanguages
    {
        get => DeserializeList(SpokenLanguagesData);
        set => SpokenLanguagesData = SerializeList(value);
    }

    /// <summary>
    /// Persisted representation of employee skills
    /// </summary>
    [JsonIgnore]
    public string SkillsData { get; set; } = "[]";

    /// <summary>
    /// List of the employee's skills
    /// </summary>
    [NotMapped]
    [JsonPropertyName("skills")]
    public List<string> Skills
    {
        get => DeserializeList(SkillsData);
        set => SkillsData = SerializeList(value);
    }

    /// <summary>
    /// The employee's current role
    /// </summary>
    [JsonPropertyName("current_role")]
    public string CurrentRole { get; set; } = string.Empty;

    /// <summary>
    /// Gets the employee's full name
    /// </summary>
    public string FullName => $"{FirstName} {LastName}";

    private static List<string> DeserializeList(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return new List<string>();
        }

        try
        {
            var result = JsonSerializer.Deserialize<List<string>>(json);
            return result ?? new List<string>();
        }
        catch
        {
            return new List<string>();
        }
    }

    private static string SerializeList(List<string>? values)
    {
        return JsonSerializer.Serialize(values ?? new List<string>());
    }
}

/// <summary>
/// Container for a collection of employees
/// </summary>
public class EmployeeCollection
{
    /// <summary>
    /// List of employees
    /// </summary>
    public List<Employee> Employees { get; set; } = new();
}

