using BeanBarAPI.Data;
using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using BeanBarAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using BeanBarAPI.Services;
using Org.BouncyCastle.Crypto.Generators;
using System.Net.Mail;

namespace BeanBarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        private readonly CoffeeDBcontext _context;
        private readonly IIDValidationService _idValidationService;
        private readonly IEmailService _emailService;

        public AuthController(
            IAuthService authService,
            IJwtService jwtService,
            CoffeeDBcontext context,
            IIDValidationService idValidationService,
            IEmailService emailService)
        {
            _authService = authService;
            _jwtService = jwtService;
            _context = context;
            _idValidationService = idValidationService;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            // Validate ID
            var validation = _idValidationService.ValidateSouthAfricanID(dto.CustomerID);
            if (!validation.IsValid)
                return BadRequest(validation.ValidationMessage);

            // Check if email or CustomerID already exists
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email || u.CustomerID == dto.CustomerID))
                return Conflict("Email or ID already registered.");

            // Hash password
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Create user
            var user = new User
            {
                Email = dto.Email,
                FullName = dto.FullName,
                Password = hashedPassword,
                UserRole = "Customer",
                IsActive = true,
                CustomerID = dto.CustomerID,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow,
                DateOfBirth = validation.DateOfBirth
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create EmailDTO and send email
            var welcomeEmail = new EmailDTO
            {
                ToEmail = user.Email,
                Subject = "Welcome to BeanBar!",
                Body = $"Hi {user.FullName}, your registration was successful!"
            };

            await _emailService.SendEmailAsync(welcomeEmail);

            return Ok("Registration successful. Check your email.");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var user = await _authService.LoginAsync(dto);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshTokenValue = _jwtService.GenerateRefreshToken();

            var refreshToken = new RefreshToken
            {
                Token = refreshTokenValue,
                CustomerID = user.CustomerID,
                Created = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                AccessToken = accessToken,
                RefreshToken = refreshTokenValue,
                User = user
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenRefreshRequest request)
        {
            var principal = _jwtService.GetPrincipalFromExpiredToken(request.AccessToken);
            if (principal == null)
                return BadRequest("Invalid access token.");

            var customerId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(customerId))
                return BadRequest("Invalid token claims - CustomerID missing.");

            var oldRefreshToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken && rt.CustomerID == customerId);

            if (oldRefreshToken == null || !oldRefreshToken.IsActive)
                return Unauthorized("Refresh token is invalid, expired, or revoked.");

            oldRefreshToken.Revoked = DateTime.UtcNow;
            var newRefreshTokenValue = _jwtService.GenerateRefreshToken();

            oldRefreshToken.ReplacedByToken = newRefreshTokenValue;

            var newRefreshToken = new RefreshToken
            {
                Token = newRefreshTokenValue,
                CustomerID = customerId,
                Created = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            _context.RefreshTokens.Add(newRefreshToken);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.CustomerID == customerId);
            if (user == null)
                return NotFound("User not found.");

            var newAccessToken = _jwtService.GenerateAccessToken(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshTokenValue
            });
        }
    }

    public class TokenRefreshRequest
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
