using System.Text.Json;

public interface ISkillsDataService
{
     Task<IEnumerable<Skill>> GetAllSkills();
     Task<Skill> GetSkill(int id);
}

public class SkillsDataService : ISkillsDataService
{
      // Using the httpclient to call our API, 
    // its being initialized via the constructor injection
    private readonly HttpClient _httpClient;

    public SkillsDataService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Skill>> GetAllSkills()
    {
        var apiResponse = await _httpClient.GetStreamAsync($"api/skills");
        return await JsonSerializer.DeserializeAsync<IEnumerable<Skill>>
                            (apiResponse, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
    }

    public async Task<Skill> GetSkill(int id)
    {
        var apiResponse = await _httpClient.GetStreamAsync($"api/skills/{id}");
        return await JsonSerializer.DeserializeAsync<Skill>
                            (apiResponse, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
    }
}