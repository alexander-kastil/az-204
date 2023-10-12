using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FoodDapr
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        [HttpPost]
        [Dapr.Topic("foodpubsub", "food-items")]
        public ActionResult CreateInvoice([FromBody] FoodItem food )
        {
            Console.WriteLine($"Invoice Created for {food.Name} at {food.Price}");
            return Ok("Invoice Created");
        }    
    }
}