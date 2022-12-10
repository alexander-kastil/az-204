using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;

namespace FoodApi
{
    [Authorize]
    [Route ("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase {
        
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        
        public FoodController (FoodDBContext context) {
            ctx = context;
        }

        private FoodDBContext ctx;

        // http://localhost:PORT/food
        [HttpGet ()]
        public IEnumerable<FoodItem> GetFood () {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            return ctx.Food.ToArray ();
        }

        // http://localhost:PORT/food/3
        [HttpGet ("{id}")]
        public FoodItem GetById (int id) {
            return ctx.Food.FirstOrDefault (v => v.ID == id);
        }

        // http://localhost:PORT/food
        [HttpPost ()]
        public FoodItem SaveFood (FoodItem item) {

            if(item.ID==0){
                ctx.Food.Add (item);
            }else{
                ctx.Food.Attach(item);
                ctx.Entry(item).State = EntityState.Modified;
            }           
            ctx.SaveChanges ();
            return item;
        }

        // http://localhost:PORT/food
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