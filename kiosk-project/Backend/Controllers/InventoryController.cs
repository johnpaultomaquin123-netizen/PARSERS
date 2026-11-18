using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/inventory")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InventoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/inventory
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.KioskItems.ToListAsync();
            return Ok(items);
        }

        // POST: api/inventory
        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] KioskItem item)
        {
            _context.KioskItems.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // PUT: api/inventory/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] KioskItem updatedItem)
        {
            var item = await _context.KioskItems.FindAsync(id);
            if (item == null) return NotFound(new { message = "Item not found." });

            item.Name = updatedItem.Name;
            item.Category = updatedItem.Category;
            item.SubCategory = updatedItem.SubCategory;
            item.Price = updatedItem.Price;
            item.Stock = updatedItem.Stock;
            item.ImageUrl = updatedItem.ImageUrl;
            item.Badge = updatedItem.Badge;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // DELETE: api/inventory/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.KioskItems.FindAsync(id);
            if (item == null) return NotFound(new { message = "Item not found." });

            _context.KioskItems.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Item deleted successfully." });
        }
    }
}