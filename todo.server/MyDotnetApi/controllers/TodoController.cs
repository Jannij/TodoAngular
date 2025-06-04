using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDotnetApi.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;

namespace MyDotnetApi.Controllers
{
    [ApiController]
    [Route("api/todo")]
    [Authorize] // 🔐 Protect all routes with JWT
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        // 🔹 Helper: Get current user ID from JWT
        private string GetUserId() =>
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;

        // 🔸 Get all uncompleted tasks for the current user
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = GetUserId();
            var items = await _context.Todos
                .Where(t => !t.IsCompleted && t.UserId == userId)
                .ToListAsync();

            return Ok(items);
        }

        // 🔸 Get completed tasks for the current user
        [HttpGet("completed")]
        public async Task<IActionResult> GetCompleted()
        {
            var userId = GetUserId();
            var items = await _context.Todos
                .Where(t => t.IsCompleted && t.UserId == userId)
                .ToListAsync();

            return Ok(items);
        }

        // 🔸 Add a new task for the current user
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Todo newItem)
        {
            newItem.UserId = GetUserId();
            _context.Todos.Add(newItem);
            await _context.SaveChangesAsync();
            return Ok(newItem);
        }

        // 🔸 Mark a task as completed (only if it belongs to the current user)
        [HttpPut("{id}/complete")]
        public async Task<IActionResult> MarkCompleted(string id)
        {
            var userId = GetUserId();
            var task = await _context.Todos
                .Where(t => t.Id == id && t.UserId == userId)
                .FirstOrDefaultAsync();

            if (task == null) return NotFound();

            task.IsCompleted = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // 🔸 Delete a task (only if it belongs to the current user)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userId = GetUserId();
            var task = await _context.Todos
                .Where(t => t.Id == id && t.UserId == userId)
                .FirstOrDefaultAsync();

            if (task == null) return NotFound();

            _context.Todos.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
