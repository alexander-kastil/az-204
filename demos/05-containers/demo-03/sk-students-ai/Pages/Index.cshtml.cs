using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace SemanticKernel.FunctionCalling;

public class IndexModel : PageModel {
  private readonly ILogger<IndexModel> _logger;
  private readonly IConfiguration _config;
 
  [BindProperty]
  public string? Reply { get; set; }
 
  public IndexModel(ILogger<IndexModel> logger, IConfiguration config) {
    _logger = logger;
    _config = config;
  }
  public void OnGet() { }
  // action method that receives prompt from the form
  public async Task<IActionResult> OnPostAsync(string prompt) {
    // call the Azure Function
    var response = await CallFunction(prompt);
    Reply = response;
    return Page();
  }
 
  private async Task<string> CallFunction(string question) {
    string azEndpoint = _config["AzureOpenAiSettings:Endpoint"]!;
    string azApiKey = _config["AzureOpenAiSettings:ApiKey"]!;
    string azModel = _config["AzureOpenAiSettings:Model"]!;

    var builder = Kernel.CreateBuilder();    
    builder.Services.AddAzureOpenAIChatCompletion(azModel, azEndpoint, azApiKey);
   
    builder.Services.AddLogging(c => c.AddDebug().SetMinimumLevel(LogLevel.Trace));
    builder.Plugins.AddFromType<StudentPlugin>();
    var kernel = builder.Build();

    // Create chat history
    ChatHistory history = [];
    // Get chat completion service
    var chatCompletionService = kernel.GetRequiredService<IChatCompletionService>();
    // Get user input
    history.AddUserMessage(question);
    // Enable auto function calling
    OpenAIPromptExecutionSettings openAIPromptExecutionSettings = new() {
      ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
    };
    // Get the response from the AI
    var result = chatCompletionService.GetStreamingChatMessageContentsAsync(
      history,
      executionSettings: openAIPromptExecutionSettings,
      kernel: kernel);
    string fullMessage = "";
    await foreach (var content in result) {
      fullMessage += content.Content;
    }
    // Add the message to the chat history
    history.AddAssistantMessage(fullMessage);
    return fullMessage;
  }
}