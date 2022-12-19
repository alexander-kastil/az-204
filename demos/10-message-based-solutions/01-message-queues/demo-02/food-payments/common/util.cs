using System;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
namespace Integrations
{
    public class Util
    {
        // Delay mock to simulate complex processing and allow scaling
        public static void CheckThrottle()
        {
            var sleep = Int32.Parse(Environment.GetEnvironmentVariable("Sleep"));
            if (sleep > 0)
            {
                System.Threading.Thread.Sleep(sleep);
            }
        }

        public static MemoryStream CreatePDF(string html)
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