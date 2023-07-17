using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace FoodApp.MailDeamon
{
    [Route("[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        AppConfig config { get; set; }
        public MailController(IConfiguration cfg)
        {
            config =  cfg.Get<AppConfig>();
        }

        [HttpPost]
        [Route("send")]
        public ActionResult SendMail([FromBody]MailModel mail)
        {
            GraphHelper.SendMail(mail.subject, mail.text, new[] { mail.recipient }, config.GraphCfg);
            return Ok();
        }        
    }
}