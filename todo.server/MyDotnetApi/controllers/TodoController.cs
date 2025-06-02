using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDotnetApi.Models;
using System.Threading.Tasks;
using System.Linq;

namespace MyDotnetApi.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        // Get all uncompleted tasks
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var items = await _context.Todos
                .Where(t => !t.IsCompleted)
                .ToListAsync();

            return Ok(items);
        }

        // Add a new task
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Todo newItem)
        {
            _context.Todos.Add(newItem);
            await _context.SaveChangesAsync();
            return Ok(newItem);
        }

        // Get completed tasks
        [HttpGet("completed")]
        public async Task<IActionResult> GetCompleted()
        {
            var items = await _context.Todos
                .Where(t => t.IsCompleted)
                .ToListAsync();

            return Ok(items);
        }

        // Mark task as completed
        [HttpPut("{id}/complete")]
        public async Task<IActionResult> MarkCompleted(string id)
        {
            var task = await _context.Todos.FindAsync(id);
            if (task == null) return NotFound();

            task.IsCompleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
