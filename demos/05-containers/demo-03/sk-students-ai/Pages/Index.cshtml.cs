using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace SKFunctionCalling;

public class IndexModel(Kernel chatKernel) : PageModel
{

  [BindProperty]
  public string? Reply { get; set; }

  public void OnGet() { }
  // action method that receives prompt from the form
  public async Task<IActionResult> OnPostAsync(string prompt)
  {
    // call the Azure Function
    var response = await CallFunction(prompt);
    Reply = response;
    return Page();
  }

  private async Task<string> CallFunction(string question)
  {
    // Create chat history
    ChatHistory history = [];
    // Get chat completion service
    var chatCompletionService = chatKernel.GetRequiredService<IChatCompletionService>();
    // Get user input
    history.AddUserMessage(question);
    // Enable auto function calling
    OpenAIPromptExecutionSettings openAIPromptExecutionSettings = new()
    {
      ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
    };
    // Get the response from the AI
    var result = chatCompletionService.GetStreamingChatMessageContentsAsync(
      history,
      executionSettings: openAIPromptExecutionSettings,
      kernel: chatKernel);
    string fullMessage = "";
    await foreach (var content in result)
    {
      fullMessage += content.Content;
    }
    // Add the message to the chat history
    history.AddAssistantMessage(fullMessage);
    return fullMessage;
  }
}