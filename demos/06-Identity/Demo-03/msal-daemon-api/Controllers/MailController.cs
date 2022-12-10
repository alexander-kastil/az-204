using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MSALDaemon
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

        // https://localhost:5001/mail/send
        // test with send-mail.http
        [Route("send")]
        [HttpPost]
        public ActionResult SendMail([FromBody]MailModel mail)
        {
            GraphHelper.SendMail(mail.subject, mail.text, new[] { mail.recipient }, config.GraphCfg);
            return Ok();
        }
    }
}