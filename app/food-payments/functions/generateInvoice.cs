using System;
using System.IO;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Integrations
{
    public class GenerateInvoice
    {
        [FunctionName("generateInvoice")]
        public static async Task RunAsync([QueueTrigger("food-orders", Connection = "PaymentConnectionString")] string item, Binder binder, ILogger log)
        {
            log.LogInformation($"Processing Payment for item: {item}");
            Util.CheckThrottle();
            var pdfStream = Util.CreatePDF(item);

            // Declare imperative output binding to allow setting the filename from within the function
            var fileName = $"invoice-{Guid.NewGuid()}.pdf";
            var attributes = new Attribute[]
              {
                new BlobAttribute($"invoices/{fileName}", FileAccess.Write),
                new StorageAccountAttribute("PaymentConnectionString")
              };

            using (var writer = await binder.BindAsync<Stream>(attributes))
            {
                writer.Write(pdfStream.ToArray());
            };
        }
    }
}
