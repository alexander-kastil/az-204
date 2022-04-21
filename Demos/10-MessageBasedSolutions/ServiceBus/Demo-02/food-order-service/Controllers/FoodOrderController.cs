using System;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp.OrderService;

[ApiController]
[Route("[controller]")]
public class FoodOrderController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<FoodOrderController> _logger;

    public FoodOrderController(ILogger<FoodOrderController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("get")]
    public IEnumerable<object> Get()
    {
        return null;
    }
}