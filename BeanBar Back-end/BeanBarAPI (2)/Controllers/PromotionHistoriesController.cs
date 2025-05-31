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
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionHistoriesController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public PromotionHistoriesController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // GET: api/PromotionHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PromotionHistory>>> GetPromotionHistory()
        {
            return await _context.PromotionHistory.ToListAsync();
        }

        // GET: api/PromotionHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PromotionHistory>> GetPromotionHistory(int id)
        {
            var promotionHistory = await _context.PromotionHistory.FindAsync(id);

            if (promotionHistory == null)
            {
                return NotFound();
            }

            return promotionHistory;
        }

        // PUT: api/PromotionHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromotionHistory(int id, PromotionHistory promotionHistory)
        {
            if (id != promotionHistory.PromotionID)
            {
                return BadRequest();
            }

            _context.Entry(promotionHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromotionHistoryExists(id))
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

        // POST: api/PromotionHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PromotionHistory>> PostPromotionHistory(PromotionHistory promotionHistory)
        {
            _context.PromotionHistory.Add(promotionHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPromotionHistory", new { id = promotionHistory.PromotionID }, promotionHistory);
        }

        // DELETE: api/PromotionHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotionHistory(int id)
        {
            var promotionHistory = await _context.PromotionHistory.FindAsync(id);
            if (promotionHistory == null)
            {
                return NotFound();
            }

            _context.PromotionHistory.Remove(promotionHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PromotionHistoryExists(int id)
        {
            return _context.PromotionHistory.Any(e => e.PromotionID == id);
        }
    }
}
