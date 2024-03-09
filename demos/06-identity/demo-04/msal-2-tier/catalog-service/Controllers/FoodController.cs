using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodApp
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        AILogger logger;

        public FoodController(FoodDBContext context, AILogger ai)
        {
            ctx = context;
            logger = ai;
        }

        FoodDBContext ctx;

        // http://localhost:PORT/food
        [HttpGet()]
        public async Task<IEnumerable<CatalogItem>> GetFood()
        {
            logger.LogEvent("GetFood", "test");
            return await ctx.Food.ToArrayAsync();
        }

        // http://localhost:PORT/food/3
        [HttpGet("{id}")]
        public async Task<CatalogItem> GetById(int id)
        {
            return await ctx.Food.FirstOrDefaultAsync(v => v.ID == id);
        }

        // http://localhost:PORT/food
        [HttpPost()]
        public async Task<CatalogItem> CreateFood(CatalogItem item)
        {
            ctx.Food.Add(item);
            await ctx.SaveChangesAsync();
            return item;
        }

        // http://localhost:PORT/food
        [HttpPut()]
        public async Task<CatalogItem> UpdateFood(CatalogItem item)
        {
            ctx.Food.Attach(item);
            ctx.Entry(item).State = EntityState.Modified;
            await ctx.SaveChangesAsync();
            return item;
        }

        // http://localhost:PORT/food
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFood(int id)
        {
            var item = GetById(id);
            if (item != null)
            {
                ctx.Remove(item);
                await ctx.SaveChangesAsync();
            }
            return Ok();
        }
    }
}