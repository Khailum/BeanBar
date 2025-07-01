using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Models;
using BeanBarAPI.Helpers;

namespace BeanBar_Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public MenusController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // GET: api/Menus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Menu>>> GetMenus()
        {
            return await _context.Menu.ToListAsync();
        }

        // GET: api/Menus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Menu>> GetMenu(int id)
        {
            var menu = await _context.Menu.FindAsync(id);

            if (menu == null)
            {
                return NotFound();
            }

            return menu;
        }

        // PUT: api/Menus/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenu(int id, Menu menu)
        {
            if (id != menu.ItemID)
            {
                return BadRequest("Item ID mismatch.");
            }

            menu.ItemName = InputSanitiser.Sanitize(menu.ItemName);
            menu.ItemType = InputSanitiser.Sanitize(menu.ItemType);
            menu.ItemDescription = InputSanitiser.Sanitize(menu.ItemDescription);
            menu.ImageUrl = InputSanitiser.Sanitize(menu.ImageUrl);

            _context.Entry(menu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuExists(id))
                {
                    return NotFound($"No menu item found with ID {id}.");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "A concurrency error occurred while updating the menu.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Unexpected error: {ex.Message}");
            }
        }

        // POST: api/Menus
        [HttpPost]
        public async Task<ActionResult<Menu>> PostMenu(Menu menu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Returns detailed validation errors
            }

            try
            {
                menu.ItemName = InputSanitiser.Sanitize(menu.ItemName);
                menu.ItemType = InputSanitiser.Sanitize(menu.ItemType);
                menu.ItemDescription = InputSanitiser.Sanitize(menu.ItemDescription);
                menu.ImageUrl = InputSanitiser.Sanitize(menu.ImageUrl);

                _context.Menu.Add(menu);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetMenu), new { id = menu.ItemID }, menu);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while creating the menu item: {ex.Message}");
            }
        }

        //PACTH: used in the front-end
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMenu(int id, [FromBody] Menu menu)
        {
            if (id != menu.ItemID) return BadRequest();

            menu.ItemName = InputSanitiser.Sanitize(menu.ItemName);
            menu.ItemType = InputSanitiser.Sanitize(menu.ItemType);
            menu.ItemDescription = InputSanitiser.Sanitize(menu.ItemDescription);
            menu.ImageUrl = InputSanitiser.Sanitize(menu.ImageUrl);

            _context.Entry(menu).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Menus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            try
            {
                var menu = await _context.Menu.FindAsync(id);
                if (menu == null)
                {
                    return NotFound($"Menu item with ID {id} not found.");
                }

                _context.Menu.Remove(menu);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while deleting the menu item: {ex.Message}");
            }
        }

        private bool MenuExists(int id)
        {
            return _context.Menu.Any(e => e.ItemID == id);
        }
    }
}