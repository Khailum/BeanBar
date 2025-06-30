using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Models;
using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using BeanBarAPI.Services;
using BeanBarAPI.Helpers;

namespace BeanBarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;
        private readonly IPasswordService _passwordService;
        private readonly IJwtService _jwtService;

        public UsersController(CoffeeDBcontext context, IPasswordService passwordService, IJwtService jwtService)
        {
            _context = context;
            _passwordService = passwordService;
            _jwtService = jwtService;
        }

        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                user.Email = InputSanitiser.Sanitize(user.Email);
                user.FullName = InputSanitiser.Sanitize(user.FullName);
                user.PhoneNumber = InputSanitiser.Sanitize(user.PhoneNumber);
                user.Address = InputSanitiser.Sanitize(user.Address);
                user.UserRole = InputSanitiser.Sanitize(user.UserRole);
                user.CustomerID = InputSanitiser.Sanitize(user.CustomerID);

                if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                {
                    return Conflict(new { message = "Email already exists." });
                }

                var salt = _passwordService.GenerateSalt();
                user.Password = _passwordService.HashPassword(user.Password, salt);
                user.Token = salt;
                user.CreatedAt = DateTime.UtcNow;
                user.IsActive = true;

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUser), new { id = user.Email }, new
                {
                    message = "Registration successful.",
                    user = new
                    {
                        user.Email,
                        user.FullName,
                        user.UserRole,
                        user.CustomerID,
                        user.PhoneNumber,
                        user.Address,
                        user.DateOfBirth
                    }
                });
            }
            catch (Exception ex)
            {
                // Log the exception in production systems
                return StatusCode(500, new { message = "An error occurred during registration.", details = ex.Message });
            }
        }

        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            string sanitizedEmail = InputSanitiser.Sanitize(loginDto.Email);
            string sanitizedPassword = InputSanitiser.Sanitize(loginDto.Password);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == sanitizedEmail);

            if (user == null || !_passwordService.VerifyPassword(sanitizedPassword, user.Password, user.Token))
                return Unauthorized("Invalid email or password.");

            if (!user.IsActive)
                return Unauthorized("Account is inactive.");

            var token = _jwtService.GenerateAccessToken(user);

            return Ok(new
            {
                Token = token,
                User = new
                {
                    user.Email,
                    user.FullName,
                    user.UserRole,
                    user.CustomerID,
                    user.PhoneNumber,
                    user.Address,
                    user.DateOfBirth
                }
            });
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.CustomerID)
                return BadRequest();

            user.Email = InputSanitiser.Sanitize(user.Email);
            user.FullName = InputSanitiser.Sanitize(user.FullName);
            user.PhoneNumber = InputSanitiser.Sanitize(user.PhoneNumber);
            user.Address = InputSanitiser.Sanitize(user.Address);
            user.UserRole = InputSanitiser.Sanitize(user.UserRole);

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.CustomerID == id))
                    return NotFound();
                else
                    throw;
            }

            return Ok(user);
        }
    }
}
