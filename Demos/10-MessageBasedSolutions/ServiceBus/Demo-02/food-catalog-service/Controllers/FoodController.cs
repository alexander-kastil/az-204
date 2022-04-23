using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using Microsoft.Extensions.Configuration;
using FoodApp.Common;

namespace FoodApp.CatalogService
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        public FoodController(FoodCatalogDBContext context, IConfiguration config)
        {
            ctx = context;
            cfg = config.Get<FoodConfig>();
        }

        FoodCatalogDBContext ctx;
        FoodConfig cfg;

        // http://localhost:PORT/food
        [HttpGet()]
        public async Task<IEnumerable<FoodItem>> GetFood()
        {
            verfiyScope(); // could be implemented using a custom filter
            return await ctx.Food.ToListAsync<FoodItem>();
        }

        // http://localhost:PORT/food/3
        [HttpGet("{id}")]
        public async Task<FoodItem> GetById(int id)
        {
            verfiyScope();
            return await ctx.Food.FirstOrDefaultAsync(v => v.ID == id);
        }

        // http://localhost:PORT/food
        [HttpPost()]
        public async Task<FoodItem> SaveFood(FoodItem item)
        {
            verfiyScope();
            if (item.ID == 0)
            {
                await ctx.Food.AddAsync(item);
            }
            else
            {
                ctx.Food.Attach(item);
                ctx.Entry(item).State = EntityState.Modified;
            }            

            await ctx.SaveChangesAsync();        
            return item;
        }

        // http://localhost:PORT/food
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            verfiyScope();
            var v = await GetById(id);
            if (v != null)
            {
                ctx.Remove(v);
                await ctx.SaveChangesAsync();
            }
            return Ok();
        }

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