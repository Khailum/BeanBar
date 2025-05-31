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
    public class JwtSettingsController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public JwtSettingsController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // GET: api/JwtSettings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JwtSettings>>> GetJwtSettings()
        {
            return await _context.JwtSettings.ToListAsync();
        }

        // GET: api/JwtSettings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JwtSettings>> GetJwtSettings(string id)
        {
            var jwtSettings = await _context.JwtSettings.FindAsync(id);

            if (jwtSettings == null)
            {
                return NotFound();
            }

            return jwtSettings;
        }

        // PUT: api/JwtSettings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJwtSettings(string id, JwtSettings jwtSettings)
        {
            if (id != jwtSettings.SecretKey)
            {
                return BadRequest();
            }

            _context.Entry(jwtSettings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JwtSettingsExists(id))
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

        // POST: api/JwtSettings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JwtSettings>> PostJwtSettings(JwtSettings jwtSettings)
        {
            _context.JwtSettings.Add(jwtSettings);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (JwtSettingsExists(jwtSettings.SecretKey))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetJwtSettings", new { id = jwtSettings.SecretKey }, jwtSettings);
        }

        // DELETE: api/JwtSettings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJwtSettings(string id)
        {
            var jwtSettings = await _context.JwtSettings.FindAsync(id);
            if (jwtSettings == null)
            {
                return NotFound();
            }

            _context.JwtSettings.Remove(jwtSettings);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JwtSettingsExists(string id)
        {
            return _context.JwtSettings.Any(e => e.SecretKey == id);
        }
    }
}
