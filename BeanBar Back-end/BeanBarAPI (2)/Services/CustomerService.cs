using System;
using System.Linq;
using System.Threading.Tasks;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BeanBarAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly CoffeeDBcontext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<CustomerService> _logger;

        public CustomerService(CoffeeDBcontext context, IEmailService emailService, ILogger<CustomerService> logger)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task SendBirthdayEmailsAsync()
        {
            var today = DateTime.Today;

            var birthdayCustomers = await _context.Customers
                .Where(c => c.DateOfBirth.Month == today.Month && c.DateOfBirth.Day == today.Day)
                .ToListAsync();

            foreach (var customer in birthdayCustomers)
            {
                try
                {
                    await _emailService.SendEmailAsync(new DTOs.EmailDTO
                    {
                        ToEmail = customer.Email,
                        Subject = "🎉 Happy Birthday from BeanBar!",
                        Body = EmailTemplates.BirthdayEmail(customer.FirstName)
                    });

                    _logger.LogInformation($"Birthday email sent to {customer.Email}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error sending birthday email to {customer.Email}");
                }
            }
        }

        public async Task SendMonthlyPromotionsAsync()
        {
            var today = DateTime.Today;

            var eligibleCustomers = await _context.Customers
                .Where(c => c.LastPromotionDate == null || EF.Functions.DateDiffDay(c.LastPromotionDate, today) >= 30)
                .ToListAsync();

            foreach (var customer in eligibleCustomers)
            {
                try
                {
                    await _emailService.SendEmailAsync(new DTOs.EmailDTO
                    {
                        ToEmail = customer.Email,
                        Subject = "☕ Your Monthly Free Drink Awaits!",
                        Body = EmailTemplates.MonthlyPromoEmail(customer.FirstName)
                    });

                    // Update LastPromotionDate
                    customer.LastPromotionDate = today;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error sending promo to {customer.Email}");
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
