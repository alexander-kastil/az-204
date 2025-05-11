using System.ComponentModel.DataAnnotations;

namespace SKFunctionCalling;
public class Student
{
   public int StudentId { get; set; }

   [Display(Name = "First Name")]
   [Required]
   public string? FirstName { get; set; }

   [Display(Name = "Last Name")]
   [Required]
   public string? LastName { get; set; }

   [Required]
   public string? School { get; set; }

   [Required]
   public int Age { get; set; }

   public override string ToString()
   {
      return $"Student ID: {StudentId}, First Name: {FirstName}, Last Name: {LastName}, School: {School}";
   }
}
