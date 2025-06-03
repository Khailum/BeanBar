using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Models;
using BeanBarAPI.Services;
using BeanBarAPI.Interfaces;

namespace BeanBar_Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionHistoriesController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;
        private readonly PromotionServices _promotionService;
        private readonly IEmailService _emailService;

        public PromotionHistoriesController(CoffeeDBcontext context, IEmailService emailService)
        {
            _context = context;
            _promotionService = new PromotionServices(_context, emailService);
        }


        // GET: api/PromotionHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PromotionHistory>>> GetAllPromotions()
        {
            return await _context.PromotionHistory.ToListAsync();
        }

        // GET: api/PromotionHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PromotionHistory>> GetPromotionById(int id)
        {
            var promo = await _context.PromotionHistory.FindAsync(id);
            if (promo == null) return NotFound();

            return promo;
        }

        // GET: api/PromotionHistories/active/{customerId}
        [HttpGet("active/{customerId}")]
        public async Task<ActionResult<IEnumerable<PromotionHistory>>> GetActivePromotions(string customerId)
        {
            var activePromos = await _promotionService.GetActivePromotions(customerId);
            return Ok(activePromos);
        }

        // POST: api/PromotionHistories/promote
        [HttpPost("promote")]
        public async Task<IActionResult> PromoteEligibleCustomers()
        {
            await _promotionService.PromoteEligibleCustomersAsync();
            return Ok(new { message = "Promotions assigned where applicable." });
        }

        // POST: api/PromotionHistories/place-order
        [HttpPost("place-order")]
        public async Task<IActionResult> PlaceOrderWithPromotion(Order order)
        {
            var result = await _promotionService.PlaceOrderAsync(order);

            if (result)
                return Ok(new { message = "Order placed with applicable promotion." });
            else
                return BadRequest("Failed to place order.");
        }

        // PUT: api/PromotionHistories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePromotion(int id, PromotionHistory updatedPromo)
        {
            if (id != updatedPromo.PromotionID)
                return BadRequest();

            _context.Entry(updatedPromo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromotionExists(id))
                    return NotFound();
                else
                    throw;
            }
        }

        // POST: api/PromotionHistories
        [HttpPost]
        public async Task<ActionResult<PromotionHistory>> CreatePromotion(PromotionHistory promo)
        {
            _context.PromotionHistory.Add(promo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPromotionById", new { id = promo.PromotionID }, promo);
        }

        // DELETE: api/PromotionHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promo = await _context.PromotionHistory.FindAsync(id);
            if (promo == null) return NotFound();

            _context.PromotionHistory.Remove(promo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PromotionExists(int id)
        {
            return _context.PromotionHistory.Any(e => e.PromotionID == id);
        }
    }
}
