using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Models;
using System.Text.Json;

namespace BeanBar_Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public DeliveriesController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Delivery>>> GetDeliveries()
        {
            return await _context.Deliveries.ToListAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Delivery>> GetDelivery(int id)
        {
            var delivery = await _context.Deliveries.FindAsync(id);

            if (delivery == null)
            {
                return NotFound();
            }

            return delivery;
        }

        // PUT: api/Deliveries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDelivery(int id, Delivery delivery)
        {
            if (id != delivery.DeliveryID)
            {
                return BadRequest();
            }

            _context.Entry(delivery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Deliveries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Delivery>> PostDelivery(Delivery delivery)
        {
            _context.Deliveries.Add(delivery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDelivery", new { id = delivery.DeliveryID }, delivery);
        }

        // PATCH: api/Deliveries/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchDeliveryStatus(int id, [FromBody] JsonElement body)
        {
            var delivery = await _context.Deliveries.FindAsync(id);
            if (delivery == null)
            {
                return NotFound();
            }

            if (!body.TryGetProperty("DeliveryStatus", out var statusProperty))
            {
                return BadRequest("Missing DeliveryStatus field");
            }

            string newStatus = statusProperty.GetString();

            // Optional: validate the status before updating
            var validStatuses = new[] { "Preparing", "On the Way", "Delivered" };
            if (!validStatuses.Contains(newStatus))
            {
                return BadRequest("Invalid DeliveryStatus value");
            }

            delivery.DeliveryStatus = newStatus;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDelivery(int id)
        {
            var delivery = await _context.Deliveries.FindAsync(id);
            if (delivery == null)
            {
                return NotFound();
            }

            _context.Deliveries.Remove(delivery);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeliveryExists(int id)
        {
            return _context.Deliveries.Any(e => e.DeliveryID == id);
        }
    }
}
