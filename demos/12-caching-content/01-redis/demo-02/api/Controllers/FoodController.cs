using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Identity.Web.Resource;
using Microsoft.Extensions.Configuration;
using FoodApp;
using Microsoft.Extensions.Caching.Distributed;

namespace FoodApi
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        public FoodController(FoodDBContext context, IConfiguration config, IDistributedCache redis)
        {
            ctx = context;
            cfg = config.Get<FoodConfig>();
            cache = redis;
        }

        FoodDBContext ctx;
        FoodConfig cfg;
        IDistributedCache cache;

        // http://localhost:PORT/food
        [HttpGet()]
        public IEnumerable<FoodItem> GetFood()
        {
            verfiyScope(); // could be implemented using a custom filter
            var cachedFood = cache.GetString("food");
            if (!string.IsNullOrEmpty(cachedFood))
            {
                Console.WriteLine("Using cached food");
                return Newtonsoft.Json.JsonConvert.DeserializeObject<FoodItem[]>(cachedFood);
            }
            else
            {
                var arr = ctx.Food.ToArray();
                cache.SetString("food", Newtonsoft.Json.JsonConvert.SerializeObject(arr));
                return arr;
            }
        }

        // http://localhost:PORT/food/3
        [HttpGet("{id}")]
        public FoodItem GetById(int id)
        {
            verfiyScope();
            return ctx.Food.FirstOrDefault(v => v.ID == id);
        }

        // http://localhost:PORT/food
        [HttpPost()]
        public FoodItem InsertFood(FoodItem item)
        {
            verfiyScope();
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
        public FoodItem UpdateFood(FoodItem item)
        {
            verfiyScope();
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
        public ActionResult Delete(int id)
        {
            verfiyScope();
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

        //TODO: Refactor to filter
        [NonAction]
        public void verfiyScope()
        {
            if (cfg.App.AuthEnabled)
            {
                string[] scopeRequiredByApi = new string[] { "access_as_user" };
                HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            }
        }
    }
}