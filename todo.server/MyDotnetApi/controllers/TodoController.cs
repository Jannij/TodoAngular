using Microsoft.AspNetCore.Mvc;
using MyDotnetApi.Models;
using System.Collections.Generic;

namespace MyDotnetApi.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private static readonly List<Todo> Items = new List<Todo>
        {
            new Todo { Title = "Buy groceries", Description = "Milk, eggs", Date = "20250529" },
            new Todo { Title = "Walk the dog", Description = "Evening walk", Date = "20250529" },
            new Todo { Title = "Write code", Description = "Finish project", Date = "20250529" }
        };

				private static readonly List<Todo> CompletedItems = new List<Todo>
        {
            new Todo { Title = "Completed", Description = "Done", Date = "202508000" },
        };

				// Tasks inComplete

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Items);
        }

        [HttpPost]
        public void Post([FromBody] Todo newItem)
        {
            Items.Add(newItem);
        }

				// Tasks inComplete
				[HttpGet]
				[Route("completed/")]
				public IActionResult GetCompleted()
				{
						return Ok(CompletedItems);
				}
    }
}
