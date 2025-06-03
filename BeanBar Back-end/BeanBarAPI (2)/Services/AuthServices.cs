using Microsoft.EntityFrameworkCore;
using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Models;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;
using Org.BouncyCastle.Crypto.Generators;

namespace BeanBarAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly CoffeeDBcontext _context;
        private readonly IIDValidationService _idValidationService;
        private readonly IEmailService _emailService;
        private readonly IPasswordService _passwordService;



        public AuthService(
                             CoffeeDBcontext context,
                             IIDValidationService idValidationService,
                             IEmailService emailService,
                             IPasswordService passwordService)
        {
            _context = context;
            _idValidationService = idValidationService;
            _emailService = emailService;
            _passwordService = passwordService;
        }


        public async Task<bool> RegisterAsync(RegisterDTO dto)
        {
            // Validate CustomerID
            var idValidation = _idValidationService.ValidateSouthAfricanID(dto.CustomerID);
            if (!idValidation.IsValid)
            {
                return false;
            }

            // Check if email or CustomerID is already registered
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email || u.CustomerID == dto.CustomerID))
            {
                return false;
            }

            // Create new user
            var user = new User
            {
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password), // Use hashing for security
                FullName = dto.FullName,
                Address = dto.Address,
                CustomerID = dto.CustomerID,
                PhoneNumber = dto.PhoneNumber,
                UserRole = "Customer",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                DateOfBirth = idValidation.DateOfBirth,
                LastPromotionDate = null
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(new EmailDTO
            {
                ToEmail = dto.Email,
                Subject = "Welcome to BeanBar!",
                Body = $"Hi {dto.FullName},\n\nWelcome to BeanBar! Your account was successfully created."
            });

            return true;
        }

        public async Task<User?> LoginAsync(LoginDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) return null;

            var auth = await _context.UserAuth.FirstOrDefaultAsync(a => a.Email == dto.Email);
            if (auth == null) return null;

            var isValidPassword = _passwordService.VerifyPassword(dto.Password, auth.HashedPassword, auth.Salt);
            if (!isValidPassword) return null;

            return user;
        }

    }
}
