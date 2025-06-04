namespace MyDotnetApi.Models;
using System.ComponentModel.DataAnnotations;

public class Todo
{
    [Key]
   	public required string Id { get; set; }  // Must be passed from frontend

    [Required]
    public required string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public bool IsCompleted { get; set; } = false;

		[Required]
		public required string UserId { get; set; }

    public Todo() {}

    public Todo(string id, string title, string? description, string userId)
    {
        Id = id;
        Title = title;
        Description = description;
				UserId = userId;
    }
}
