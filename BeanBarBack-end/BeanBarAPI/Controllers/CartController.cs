using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Models;
using BeanBarAPI.DTOs;

namespace BeanBarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public CartController(CoffeeDBcontext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        
        // Updated DTO for AddToCart
        public class AddToCartRequestDto
        {
            public int OrderNum { get; set; }
            public int ItemID { get; set; }
            public int Quantity { get; set; } = 1; // Default to 1
        }

        // POST: api/Cart/add
        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequestDto request)
        {
            if (request == null || request.ItemID <= 0 || request.OrderNum < 100 || request.Quantity <= 0)
                return BadRequest("Invalid request. Ensure OrderNum >= 100, valid ItemID, and Quantity > 0.");

            var orderExists = await _context.Orders.AnyAsync(o => o.OrderNum == request.OrderNum);
            if (!orderExists)
                return BadRequest($"Order number {request.OrderNum} does not exist.");

            var menuItem = await _context.Menu.FindAsync(request.ItemID);
            if (menuItem == null)
                return NotFound($"Menu item with ID {request.ItemID} not found.");

            var cartItem = new Cart
            {
                OrderNum = request.OrderNum,
                ItemID = menuItem.ItemID,
                ItemName = menuItem.ItemName,
                ItemType = menuItem.ItemType,
                ItemDescription = menuItem.ItemDescription,
                Price = menuItem.Price,
                IsAvailable = menuItem.IsAvailable,
                ImageUrl = menuItem.ImageUrl,
                Quantity = request.Quantity,
                DateAdded = DateTime.UtcNow
            };

            await _context.Cart.AddAsync(cartItem);
            await _context.SaveChangesAsync();

            var cartDto = new CartDTO
            {
                CartID = cartItem.CartID,
                OrderNum = cartItem.OrderNum,
                ItemID = cartItem.ItemID,
                ItemName = cartItem.ItemName,
                ItemType = cartItem.ItemType,
                ItemDescription = cartItem.ItemDescription,
                Price = cartItem.Price,
                Quantity = cartItem.Quantity,
                ImageUrl = cartItem.ImageUrl,
                DateAdded = cartItem.DateAdded
            };

            return Ok(cartDto);
        }

        // GET: api/Cart/order/{orderNum}
        [HttpGet("order/{orderNum}")]
        public async Task<IActionResult> GetCartByOrder(int orderNum)
        {
            if (orderNum < 100)
                return BadRequest("Invalid OrderNum. Must be 100 or greater.");

            var cartItems = await _context.Cart
                .Where(c => c.OrderNum == orderNum)
                .ToListAsync();

            if (!cartItems.Any())
                return NotFound($"No cart items found for order number {orderNum}.");

            return Ok(cartItems);
        }

        // DELETE: api/Cart/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.Cart.FindAsync(id);
            if (cartItem == null)
                return NotFound($"Cart item with ID {id} not found.");

            _context.Cart.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Cart/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] CartDTO updatedItem)
        {
            var existingItem = await _context.Cart.FindAsync(id);
            if (existingItem == null)
                return NotFound($"Cart item with ID {id} not found.");

            existingItem.ItemName = updatedItem.ItemName;
            existingItem.Price = updatedItem.Price;
            existingItem.ImageUrl = updatedItem.ImageUrl;
            existingItem.ItemDescription = updatedItem.ItemDescription;
            existingItem.ItemType = updatedItem.ItemType;
            existingItem.Quantity = updatedItem.Quantity;

            _context.Cart.Update(existingItem);
            await _context.SaveChangesAsync();

            return Ok(existingItem);
        }
        // Add this in a new endpoint like POST /api/Order/create (not currently shown)
        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto dto)
        {
            var newOrder = new Order
            {
                CustomerID = dto.CustomerID,
                Date = DateTime.UtcNow,
                DeliveryOption = dto.DeliveryOption,
                TotalPrice = 0, // Starts at 0, can update later
                OrderStatus = "Draft"
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            return Ok(newOrder.OrderNum);
        }

        // POST: api/Cart/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitFullCart([FromBody] FullCartSubmissionDto request)
        {
            if (request == null || request.CartItems == null || !request.CartItems.Any())
                return BadRequest("Cart items are required.");

            // 1. Create a new Order
            var newOrder = new Order
            {
                CustomerID = request.CustomerID,
                Date = DateTime.UtcNow,
                DeliveryOption = request.DeliveryOption,
                TotalPrice = request.TotalPrice,
                OrderStatus = "Pending"
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync(); // Save now to get the OrderNum (PK)

            // 2. Loop through cart items and save them
            foreach (var item in request.CartItems)
            {
                var menuItem = await _context.Menu.FindAsync(item.ItemID);
                if (menuItem == null)
                    return NotFound($"Menu item with ID {item.ItemID} not found.");

                var cartItem = new Cart
                {
                    OrderNum = newOrder.OrderNum,
                    ItemID = menuItem.ItemID,
                    ItemName = menuItem.ItemName,
                    ItemType = menuItem.ItemType,
                    ItemDescription = menuItem.ItemDescription,
                    Price = menuItem.Price,
                    Quantity = item.Quantity,
                    IsAvailable = menuItem.IsAvailable,
                    ImageUrl = menuItem.ImageUrl,
                    DateAdded = DateTime.UtcNow
                };

                await _context.Cart.AddAsync(cartItem);
            }

            await _context.SaveChangesAsync();

            return Ok(new { OrderNum = newOrder.OrderNum, Message = "Cart submitted successfully." });
        }

    }
}
