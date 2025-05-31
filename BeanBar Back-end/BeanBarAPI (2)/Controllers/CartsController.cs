using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Models;

namespace BeanBar_Back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public CartController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // POST: api/Cart/add
        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(int itemId, int orderNum)
        {
            var menuItem = await _context.Menu.FindAsync(itemId);
            if (menuItem == null)
                return NotFound("Menu item not found");

            var cartItem = new Cart
            {
                OrderNum = orderNum,
                ItemID = menuItem.ItemID,
                ItemName = menuItem.ItemName,
                Category = menuItem.Category,
                ItemType = menuItem.ItemType,
                ItemDescription = menuItem.ItemDescription,
                Price = menuItem.Price,
                IsAvailable = menuItem.IsAvailable,
                ImageUrl = menuItem.ImageUrl,
                DateAdded = DateTime.Now
            };

            _context.Add(cartItem);
            await _context.SaveChangesAsync();

            return Ok(cartItem);
        }

        // GET: api/Cart/order/101
        [HttpGet("order/{orderNum}")]
        public async Task<IActionResult> GetCartByOrder(int orderNum)
        {
            var cartItems = await _context.Set<Cart>()
                .Where(c => c.OrderNum == orderNum)
                .ToListAsync();

            return Ok(cartItems);
        }

        // DELETE: api/Cart/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.Set<Cart>().FindAsync(id);
            if (cartItem == null)
                return NotFound();

            _context.Set<Cart>().Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
