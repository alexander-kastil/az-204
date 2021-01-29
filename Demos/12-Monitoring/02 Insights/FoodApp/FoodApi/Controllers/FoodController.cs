using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace FoodApi
{
    [Route ("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase {
        public FoodController (FoodDBContext context) {
            ctx = context;
        }

        private FoodDBContext ctx;

        // http://localhost:PORT/api/food
        [HttpGet ()]
        public IEnumerable<FoodItem> GetFood () {
            return ctx.Food.ToArray ();
        }

        // http://localhost:PORT/api/food/3
        [HttpGet ("{id}")]
        public FoodItem GetById (int id) {
            return ctx.Food.FirstOrDefault (v => v.ID == id);
        }

        // http://localhost:PORT/api/food
        [HttpPost ()]
        public FoodItem SaveFood (FoodItem item) {
            ctx.Food.Add (item);
            ctx.SaveChanges ();
            return item;
        }

        // http://localhost:PORT/api/food
        [HttpDelete ("{id}")]
        public ActionResult Delete (int id) {
            var v = GetById (id);
            if (v != null) {
                ctx.Remove (v);
                ctx.SaveChanges ();
            }
            return Ok ();
        }
    }
}