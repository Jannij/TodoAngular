namespace MyDotnetApi.Models;
    public class Todo
    {
        public required string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Date { get; set; }  // or DateTime Date { get; set; }

        public Todo(){}
        public Todo(string title, string? description, int date)
        {
            Title = title;
            Description = description;
            Date = date;
        }
    }
