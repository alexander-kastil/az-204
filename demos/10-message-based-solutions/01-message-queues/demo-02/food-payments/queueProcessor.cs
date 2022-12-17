using System;
using System.IO;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using System.Threading.Tasks;

namespace Integrations
{
    public class queueProcessor
    {
        [FunctionName("processPayment")]
        public static async Task RunAsync([QueueTrigger("food-orders", Connection = "PaymentConnectionString")] string item, Binder binder, ILogger log)
        {
            log.LogInformation($"Processing Payment for item: {item}");
            // Delay mock to simulate complex processing
            var sleep = Int32.Parse(Environment.GetEnvironmentVariable("Sleep"));
            if (sleep > 0)
            {
                System.Threading.Thread.Sleep(sleep);
            }

            // Generate invoice PDF
            var pdfStream = CreatePDF(item);

            // Declare imperative output binding to allow setting the filename from within the function
            var fileName = $"invoice-{Guid.NewGuid()}.pdf";
            var attributes = new Attribute[]
              {
                new BlobAttribute($"invoices/{fileName}", FileAccess.Write),
                new StorageAccountAttribute("QueueConnectionString")
              };

            using (var writer = await binder.BindAsync<Stream>(attributes))
            {
                writer.Write(pdfStream.ToArray());
            };

            //TODO: Add application insights using azure cli
            // https://learn.microsoft.com/en-us/azure/azure-functions/configure-monitoring?tabs=v2
        }

        private static MemoryStream CreatePDF(string html)
        {
            var styles = new StyleSheet();
            var pdfStream = new MemoryStream();
            var doc = new Document(new Rectangle(288f, 144f), 10, 10, 10, 10);
            doc.SetPageSize(iTextSharp.text.PageSize.A4);
            var writer = PdfWriter.GetInstance(doc, pdfStream);
            doc.Open();
            doc.NewPage();
            var p = new Paragraph(30f);
            
            PdfPCell pdfCell = new PdfPCell
            {
                Border = 0,
                RunDirection = PdfWriter.RUN_DIRECTION_LTR
            };
            
            using (var reader = new StringReader(html))
            {
                var parsedHtmlElements = HtmlWorker.ParseToList(reader, styles);
                foreach (IElement htmlElement in parsedHtmlElements)
                {
                    pdfCell.AddElement(htmlElement);
                }
                var tbl = new PdfPTable(1);
                tbl.WidthPercentage = 100;
                tbl.SetTotalWidth(new float[] { iTextSharp.text.PageSize.A4.Width - 20 });
                tbl.AddCell(pdfCell);
                doc.Add(tbl);
            }
            doc.Close();
            return pdfStream;
        }
    }
}
