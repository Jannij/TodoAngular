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
            new Todo { Title = "Buy groceries", Description = "Milk, eggs", Date = 20250529 },
            new Todo { Title = "Walk the dog", Description = "Evening walk", Date = 20250529 },
            new Todo { Title = "Write code", Description = "Finish project", Date = 20250529 }
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Items);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Todo newItem)
        {
            Items.Add(newItem);
            return CreatedAtAction(nameof(Get), new { }, newItem);
        }
    }
}
