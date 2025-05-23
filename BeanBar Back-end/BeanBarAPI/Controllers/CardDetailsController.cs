using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBar_Back_end.Data;
using BeanBar_Back_end.Models;

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
        public async Task<ActionResult<IEnumerable<CardDetails>>> GetCardDetails()
        {
            return await _context.CardDetails.ToListAsync();
        }

        // GET: api/CardDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardDetails>> GetCardDetails(string id)
        {
            var cardDetails = await _context.CardDetails.FindAsync(id);

            if (cardDetails == null)
            {
                return NotFound();
            }

            return cardDetails;
        }

        // PUT: api/CardDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCardDetails(string id, CardDetails cardDetails)
        {
            if (id != cardDetails.AccountNumber)
            {
                return BadRequest();
            }

            _context.Entry(cardDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardDetailsExists(id))
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
        public async Task<ActionResult<CardDetails>> PostCardDetails(CardDetails cardDetails)
        {
            _context.CardDetails.Add(cardDetails);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CardDetailsExists(cardDetails.AccountNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCardDetails", new { id = cardDetails.AccountNumber }, cardDetails);
        }

        // DELETE: api/CardDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCardDetails(string id)
        {
            var cardDetails = await _context.CardDetails.FindAsync(id);
            if (cardDetails == null)
            {
                return NotFound();
            }

            _context.CardDetails.Remove(cardDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardDetailsExists(string id)
        {
            return _context.CardDetails.Any(e => e.AccountNumber == id);
        }
    }
}
