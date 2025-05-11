using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text.Json;
using Microsoft.SemanticKernel;

namespace SKFunctionCalling;

public class StudentPlugin
{
  [KernelFunction, Description("Retrieves detailed information about a specific student by their first and last name (case-insensitive). Returns null if student is not found.")]
  public static string? GetStudentDetails(
    [Description("The student's first name to search for (case-insensitive)")]
    string firstName,
    [Description("The student's last name to search for (case-insensitive)")]
    string lastName
  )
  {
    var db = Utils.GetDbContext();
    var studentDetails = db.Students
      .Where(s => s.FirstName == firstName && s.LastName == lastName)
      .FirstOrDefault();
    if (studentDetails == null)
      return null;
    return studentDetails.ToString();
  }

  [KernelFunction, Description("Retrieves the age of a specific student identified by their full name (case-insensitive). Returns null if student is not found.")]
  public static int? GetStudentAge(
    [Description("The student's first name to search for (case-insensitive)")]
    string firstName,
    [Description("The student's last name to search for (case-insensitive)")]
    string lastName
  )
  {
    var db = Utils.GetDbContext();
    var student = db.Students
      .Where(s => s.FirstName == firstName && s.LastName == lastName)
      .FirstOrDefault();
    if (student == null)
      return null;
    return student.Age;
  }

  [KernelFunction, Description("Retrieves a list of all students enrolled in a specific school (case-insensitive). Returns the students as a JSON string, or null if no students are found.")]
  public static string? GetStudentsBySchool(
    [Description("The name of the school to search for students (case-insensitive)")]
    string school
  )
  {
    var studentsBySchool = Utils.GetDbContext().Students
      .Where(s => s.School == school)
      .ToList();
    if (studentsBySchool.Count == 0)
      return null;
    return JsonSerializer.Serialize(studentsBySchool);
  }

  [KernelFunction, Description("Identifies the school with either the highest or lowest student enrollment and returns information about its student count.")]
  static public string? GetSchoolWithMostOrLeastStudents(
    [Description("Set to true to find the school with most students, false to find the school with least students")]
    bool isMost = true
  )
  {
    var students = Utils.GetDbContext().Students.ToList();
    IGrouping<string, Student>? schoolGroup = null;
    if (isMost)
      schoolGroup = students.GroupBy(s => s.School)
        .OrderByDescending(g => g.Count()).FirstOrDefault()!;
    else
      schoolGroup = students.GroupBy(s => s.School)
        .OrderBy(g => g.Count()).FirstOrDefault()!;
    if (schoolGroup != null)
      return $"{schoolGroup.Key} has {schoolGroup.Count()} students";
    else
      return null;
  }

  [KernelFunction, Description("Retrieves all students grouped by their school, sorted by enrollment count in descending order. Returns the data as a JSON string.")]
  static public string? GetStudentsInSchool()
  {
    var students = Utils.GetDbContext().Students.ToList().GroupBy(s => s.School)
      .OrderByDescending(g => g.Count());
    if (students == null)
      return null;
    else
      return JsonSerializer.Serialize(students);
  }
}