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
    public class CardDetailsController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public CardDetailsController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // GET: api/CardDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardDetail>>> GetCardDetails()
        {
            return await _context.CardDetails.ToListAsync();
        }

        // GET: api/CardDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardDetail>> GetCardDetail(string id)
        {
            var cardDetail = await _context.CardDetails.FindAsync(id);

            if (cardDetail == null)
            {
                return NotFound();
            }

            return cardDetail;
        }

        // PUT: api/CardDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCardDetail(string id, CardDetail cardDetail)
        {
            if (id != cardDetail.AccountNumber)
            {
                return BadRequest();
            }

            _context.Entry(cardDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardDetailExists(id))
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

        // POST: api/CardDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CardDetail>> PostCardDetail(CardDetail cardDetail)
        {
            _context.CardDetails.Add(cardDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CardDetailExists(cardDetail.AccountNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCardDetail", new { id = cardDetail.AccountNumber }, cardDetail);
        }

        // DELETE: api/CardDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCardDetail(string id)
        {
            var cardDetail = await _context.CardDetails.FindAsync(id);
            if (cardDetail == null)
            {
                return NotFound();
            }

            _context.CardDetails.Remove(cardDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardDetailExists(string id)
        {
            return _context.CardDetails.Any(e => e.AccountNumber == id);
        }
    }
}
