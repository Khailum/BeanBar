using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Models;
using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace BeanBar_Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CoffeeDBcontext _context;
        private readonly IIDValidationService _idValidator;
        private readonly IUserProfileService _userProfileService;

        public UsersController(CoffeeDBcontext context, IIDValidationService idValidator, IUserProfileService userProfileService)
        {
            _context = context;
            _idValidator = idValidator;
            _userProfileService = userProfileService;
        }


        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Email)
                return BadRequest();

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDTO userDto)
        {
            // Validate SA ID if CustomerID is provided
            if (!string.IsNullOrWhiteSpace(userDto.CustomerID))
            {
                var validationResult = _idValidator.ValidateSouthAfricanID(userDto.CustomerID);
                if (!validationResult.IsValid)
                {
                    return BadRequest(new { error = validationResult.ValidationMessage });
                }

                userDto.DateOfBirth = validationResult.DateOfBirth;
            }

            // Map DTO to entity
            var user = new User
            {
                Email = userDto.Email,
                FullName = userDto.FullName,
                Password = userDto.Token, // Make sure this gets hashed elsewhere
                UserRole = userDto.UserRole,
                IsActive = userDto.IsActive,
                CustomerID = userDto.CustomerID,
                PhoneNumber = userDto.PhoneNumber,
                Address = userDto.Address,
                CreatedAt = DateTime.Now,
                DateOfBirth = userDto.DateOfBirth,
                LastPromotionDate = userDto.LastPromotionDate,
                Token = userDto.Token
            };

            _context.Users.Add(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Email))
                    return Conflict();
                else
                    throw;
            }

            return CreatedAtAction(nameof(GetUser), new { id = user.Email }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("profile/{email}")]
        public async Task<IActionResult> GetUserProfile(string email)
        {
            var profile = await _userProfileService.GetUserProfileAsync(email);
            if (profile == null)
                return NotFound("User profile not found.");

            return Ok(profile);
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetCurrentUserProfile()
        {
            var email = User.Identity?.Name;
            if (string.IsNullOrEmpty(email))
                return Unauthorized();

            var profile = await _userProfileService.GetUserProfileAsync(email);
            if (profile == null)
                return NotFound("User profile not found.");

            return Ok(profile);
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Email == id);
        }

    }
}
