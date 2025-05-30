namespace MyDotnetApi.Models;
    public class Todo
    {
        public required string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public required string Date { get; set; }  // in String because of large number;

        public Todo(){}
        public Todo(string title, string? description, string date)
        {
            Title = title;
            Description = description;
            Date = date;
        }
    }
