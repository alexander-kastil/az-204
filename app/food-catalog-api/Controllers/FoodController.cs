using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Configuration;

namespace FoodApp
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        public FoodController(FoodDBContext context, IConfiguration config)
        {
            ctx = context;
            cfg = config.Get<AppConfig>();
        }

        FoodDBContext ctx;
        AppConfig cfg;

        // http://localhost:PORT/food
        [HttpGet()]
        public IEnumerable<CatalogItem> GetFood()
        {
            return ctx.Food.ToArray();
        }

        // http://localhost:PORT/food/3
        [HttpGet("{id}")]
        public CatalogItem GetById(int id)
        {
            return ctx.Food.FirstOrDefault(v => v.ID == id);
        }

        // http://localhost:PORT/food
        [HttpPost()]
        public CatalogItem CreateFood(CatalogItem item)
        {
            ctx.Food.Add(item);
            ctx.SaveChanges();

            if (cfg.FeatureManagement.PublishEvents)
            {
                Console.WriteLine("Publishing event to Service Bus - mock");
            }
            return item;
        }

        // http://localhost:PORT/food
        [HttpPut()]
        public CatalogItem UpdateFood(CatalogItem item)
        {
            ctx.Food.Attach(item);
            ctx.Entry(item).State = EntityState.Modified;
            ctx.SaveChanges();

            if (cfg.FeatureManagement.PublishEvents)
            {
                Console.WriteLine("Publishing event to Service Bus - mock");
            }
            return item;
        }

        // http://localhost:PORT/food
        [HttpDelete("{id}")]
        public ActionResult DeleteFood(int id)
        {
            var item = GetById(id);
            if (item != null)
            {
                ctx.Remove(item);
                ctx.SaveChanges();
            }

            if (cfg.FeatureManagement.PublishEvents)
            {
                Console.WriteLine("Publishing event to Service Bus - mock");
            }

            return Ok();
        }
    }
}