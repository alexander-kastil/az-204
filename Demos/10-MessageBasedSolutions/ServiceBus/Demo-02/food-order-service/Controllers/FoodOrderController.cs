using System;
using FoodApp.Common;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp.OrderService;

[ApiController]
[Route("[controller]")]
public class FoodOrderController : ControllerBase
{    
    public FoodOrderController(FoodOrderDBContext dbcontext)
    {
        ctx = dbcontext;
    }

    FoodOrderDBContext ctx;

    [HttpGet]
    public IEnumerable<object> Get()
    {
        return ctx.Orders;
    }

    [HttpPost()]
    public FoodOrder AddOrder(FoodOrder order){
        ctx.Orders.Add(order);
        ctx.SaveChanges();
        return order;
    }
}