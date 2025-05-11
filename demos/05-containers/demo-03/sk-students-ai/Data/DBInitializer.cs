using System.Globalization;
using CsvHelper;

namespace SKFunctionCalling;

public static class DBInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();
        if (context.Students.Any())
        {
            return;
        }

        var students = LoadStudents();
        context.Students.AddRange(students);
        context.SaveChanges();
    }

    public static List<Student> LoadStudents()
    {
        var students = new List<Student>();
        using (var reader = new StreamReader(Path.Combine("wwwroot", "students.csv")))
        {
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            students = csv.GetRecords<Student>().ToList();
        }
        return students;
    }
}