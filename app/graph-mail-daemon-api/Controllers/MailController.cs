using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;


namespace FoodApp.MailDaemon
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
        public ActionResult SendMail([FromBody]Mail mail)
        {
            GraphHelper.SendMail(mail.subject, mail.text, new[] { mail.recipient }, config.GraphCfg);
            return Ok();
        }   

        [HttpPost]
        [Route("sendConfirmation")]
        public ActionResult SendConfirmation([FromBody]Mail mail)
        {
            GraphHelper.SendMail(mail.subject, mail.text, new[] { mail.recipient }, config.GraphCfg);
            return Ok();
        }        
    }
}