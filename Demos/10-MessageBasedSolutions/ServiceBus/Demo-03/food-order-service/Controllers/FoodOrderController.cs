using System;
using FoodApp.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.OrderService;

[ApiController]
[Route("[controller]")]
public class FoodOrderController : ControllerBase
{    
    FoodOrderDBContext ctx;
    ServiceBusProxy sbp;

    public FoodOrderController(FoodOrderDBContext dbcontext, ServiceBusProxy proxy)
    {
        ctx = dbcontext;
        sbp = proxy;
    }

    [HttpGet]
    public async Task<IEnumerable<FoodOrder>> Get()
    {
        return await ctx.Orders.ToListAsync<FoodOrder>();
    }

    [HttpPost()]
    public async Task<FoodOrder> AddOrder(FoodOrder order){
        await ctx.Orders.AddAsync(order);
        await ctx.SaveChangesAsync();
        var ie = new FoodOrderEvent(order);
        sbp.AddEvent(ie);
        return order;
    }
}