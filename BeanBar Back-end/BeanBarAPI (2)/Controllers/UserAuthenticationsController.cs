﻿using System;
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
    public class UserAuthenticationsController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;

        public UserAuthenticationsController(CoffeeDBcontext context)
        {
            _context = context;
        }

        // GET: api/UserAuthentications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAuthentication>>> GetUserAuth()
        {
            return await _context.UserAuth.ToListAsync();
        }

        // GET: api/UserAuthentications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAuthentication>> GetUserAuthentication(int id)
        {
            var userAuthentication = await _context.UserAuth.FindAsync(id);

            if (userAuthentication == null)
            {
                return NotFound();
            }

            return userAuthentication;
        }

        // PUT: api/UserAuthentications/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAuthentication(int id, UserAuthentication userAuthentication)
        {
            if (id != userAuthentication.UsersID)
            {
                return BadRequest();
            }

            _context.Entry(userAuthentication).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAuthenticationExists(id))
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

        // POST: api/UserAuthentications
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAuthentication>> PostUserAuthentication(UserAuthentication userAuthentication)
        {
            _context.UserAuth.Add(userAuthentication);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAuthentication", new { id = userAuthentication.UsersID }, userAuthentication);
        }

        // DELETE: api/UserAuthentications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAuthentication(int id)
        {
            var userAuthentication = await _context.UserAuth.FindAsync(id);
            if (userAuthentication == null)
            {
                return NotFound();
            }

            _context.UserAuth.Remove(userAuthentication);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserAuthenticationExists(int id)
        {
            return _context.UserAuth.Any(e => e.UsersID == id);
        }
    }
}
