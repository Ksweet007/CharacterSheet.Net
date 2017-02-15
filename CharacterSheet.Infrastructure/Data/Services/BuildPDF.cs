using System.IO;
using iTextSharp.text.pdf;

namespace CharacterSheet.Infrastructure.Data.Services
{
    //http://stackoverflow.com/questions/30389224/fill-pdf-form-and-send-filled-form-with-email-using-itextsharp
    public class BuildPDF
    {
        private static void FillPDFForm()
        {
            //need to build these dynamically
            const string pdfFilePath = "C:\\ForFunDev\\ServerSideProjects\\CharSheet.pdf";
            const string newFile = "C:\\ForFunDev\\ServerSideProjects\\CharSheetFilled.pdf";

            var pdfReader = new PdfReader(pdfFilePath);
            var pdfStamper = new PdfStamper(pdfReader, new FileStream(newFile, FileMode.Create));
            var pdfFormFields = pdfStamper.AcroFields;
            FillAbilityScores(pdfFormFields);

            pdfStamper.FormFlattening = false;
            pdfStamper.FormFlattening = false;
            pdfStamper.Close();

        }

        private static void FillAbilityScores(AcroFields fields)
        {
            fields.SetField("Str", "14");
            fields.SetField("Str Mod", "2");

            fields.SetField("Dex", "14");
            fields.SetField("Dex Mod", "2");

            fields.SetField("Con", "14");
            fields.SetField("Con Mod", "2");

            fields.SetField("Wis", "14");
            fields.SetField("Wis Mod", "2");

            fields.SetField("Int", "14");
            fields.SetField("Int Mod", "2");

            fields.SetField("Cha", "14");
            fields.SetField("Cha Mod", "2");

        }
    }
}
