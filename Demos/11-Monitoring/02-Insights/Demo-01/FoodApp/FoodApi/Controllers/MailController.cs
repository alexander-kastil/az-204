using System;
using System.Collections.Generic;
using FoodApp;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace FoodApi
{
    [Route("[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        FoodConfig config { get; set; }
        public MailController(IConfiguration cfg)
        {
            var val = cfg.GetValue<string>("App:AuthEnabled");
            config = cfg.Get<FoodConfig>();
        }

        [HttpPost]
        [Route("sendMail")]
        public ActionResult SendMail(FoodItem item)
        {
            FoodApp.GraphHelper.SendMail("Take a look at this great food",JsonSerializer.Serialize(item) , new[] { config.App.mailSender }, config);
            return Ok();
        }
    }
}