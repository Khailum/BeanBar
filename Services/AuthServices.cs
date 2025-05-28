using Microsoft.EntityFrameworkCore;
using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Models;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;

namespace BeanBarAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly CoffeeDBcontext _context;
        private readonly IPasswordService _passwordService;
        private readonly IIDValidationService _idValidator;
        private readonly IEmailService _emailService;

        public AuthService(CoffeeDBcontext context, IPasswordService passwordService, IIDValidationService idValidator, IEmailService emailService)
        {
            _context = context;
            _passwordService = passwordService;
            _idValidator = idValidator;
            _emailService = emailService;
        }


        public async Task<bool> RegisterAsync(RegisterDTO dto)
        {
            // Validate ID number
            var validationResult = _idValidator.ValidateSouthAfricanID(dto.CustomerID);
            if (!validationResult.IsValid)
                return false;

            // Check if user already exists by email
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return false;

            // Add to Users table
            var user = new User
            {
                Email = dto.Email,
                Username = dto.Username,
                UserRole = "Customer"
            };
            _context.Users.Add(user);

            // Hash password
            var salt = _passwordService.GenerateSalt();
            var hashedPassword = _passwordService.HashPassword(dto.Password, salt);

            var auth = new UserAuthentication
            {
                Email = dto.Email,
                HashedPassword = hashedPassword,
                Salt = salt
            };
            _context.UserAuth.Add(auth);

            // Add to Customers table
            var token = Guid.NewGuid().ToString();  // Generate unique token

            var customer = new Customer
            {
                CustomerID = dto.CustomerID,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                CreatedAt = DateTime.Now,
                Token = token,
                LastPromotionDate = DateTime.Now
            };
            _context.Customers.Add(customer);

            await _context.SaveChangesAsync();

            // Send welcome email
            var emailBody = $@"
                <h2 style='color: #6f4e37;'>Welcome to BeanBar, {dto.FirstName}!</h2>
                <p>Thank you for signing up. We’re thrilled to have you in our coffee community.</p>
                <p>Enjoy exclusive deals, birthday rewards, and fresh brew updates!</p>
                <hr />
                <p style='font-size: small; color: gray;'>BeanBar Coffee • Love in every cup</p>";

            await _emailService.SendEmailAsync(new EmailDTO
            {
                ToEmail = dto.Email,
                Subject = "Welcome to BeanBar Coffee!",
                Body = emailBody
            });

            return true;

            try
            {
                var email = new EmailDTO
                {
                    ToEmail = dto.Email,
                    Subject = "Welcome to BeanBar ",
                    Body = EmailTemplates.WelcomeTemplate(dto.FirstName)
                };

                await _emailService.SendEmailAsync(email);
            }
            catch (Exception ex)
            {
                // Log error (if using logging)
                Console.WriteLine($"Email send failed: {ex.Message}");
            }

        }

        public async Task<UserDTO?> LoginAsync(LoginDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null) return null;

            var auth = await _context.UserAuth.FirstOrDefaultAsync(a => a.Email == user.Email);
            if (auth == null) return null;

            bool valid = _passwordService.VerifyPassword(dto.Password, auth.HashedPassword, auth.Salt);
            if (!valid) return null;

            return new UserDTO
            {
                Email = user.Email,
                Username = user.Username,
                UserRole = user.UserRole
            };
        }
    }
}
