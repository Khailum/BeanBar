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
    public class EmailSettingsController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public EmailSettingsController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // GET: api/EmailSettings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmailSettings>>> GetEmailSettings()
        {
            return await _context.EmailSettings.ToListAsync();
        }

        // GET: api/EmailSettings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmailSettings>> GetEmailSettings(string id)
        {
            var emailSettings = await _context.EmailSettings.FindAsync(id);

            if (emailSettings == null)
            {
                return NotFound();
            }

            return emailSettings;
        }

        // PUT: api/EmailSettings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmailSettings(string id, EmailSettings emailSettings)
        {
            if (id != emailSettings.Username)
            {
                return BadRequest();
            }

            _context.Entry(emailSettings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmailSettingsExists(id))
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

        // POST: api/EmailSettings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmailSettings>> PostEmailSettings(EmailSettings emailSettings)
        {
            _context.EmailSettings.Add(emailSettings);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmailSettingsExists(emailSettings.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmailSettings", new { id = emailSettings.Username }, emailSettings);
        }

        // DELETE: api/EmailSettings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmailSettings(string id)
        {
            var emailSettings = await _context.EmailSettings.FindAsync(id);
            if (emailSettings == null)
            {
                return NotFound();
            }

            _context.EmailSettings.Remove(emailSettings);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmailSettingsExists(string id)
        {
            return _context.EmailSettings.Any(e => e.Username == id);
        }
    }
}
