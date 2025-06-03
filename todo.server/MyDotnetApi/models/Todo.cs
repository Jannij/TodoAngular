namespace MyDotnetApi.Models;
using System.ComponentModel.DataAnnotations;

public class Todo
{
    [Key]
   	public required string Id { get; set; }  // Must be passed from frontend

    [Required]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public bool IsCompleted { get; set; } = false;

    public Todo() {}

    public Todo(string id, string title, string? description)
    {
        Id = id;
        Title = title;
        Description = description;
    }
}
