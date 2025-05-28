using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;
using BeanBarAPI.Services;
using BeanBarAPI.DTOs;

namespace BeanBarAPI.Services
{
    public class ScheduledEmailService
    {
        private readonly CoffeeDBcontext _context;
        private readonly IEmailService _emailService;

        public ScheduledEmailService(CoffeeDBcontext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task SendBirthdayEmailsAsync()
        {
            var today = DateTime.Today;

            var birthdayCustomers = await _context.Customers
                .Where(c => c.DateOfBirth.Month == today.Month && c.DateOfBirth.Day == today.Day)
                .ToListAsync();

            foreach (var customer in birthdayCustomers)
            {
                var email = new EmailDTO
                {
                    ToEmail = customer.Email,
                    Subject = "🎉 Happy Birthday from BeanBar!",
                    Body = EmailTemplates.BirthdayTemplate(customer.FirstName)
                };

                await _emailService.SendEmailAsync(email);
            }
        }

        public async Task SendMonthlyPromotionsAsync()
        {
            var today = DateTime.Today;

            var dueForPromo = await _context.Customers
                .Where(c => !c.LastPromotionDate.HasValue || EF.Functions.DateDiffDay(c.LastPromotionDate.Value, today) >= 30)
                .ToListAsync();

            foreach (var customer in dueForPromo)
            {
                var email = new EmailDTO
                {
                    ToEmail = customer.Email,
                    Subject = "☕ Your Monthly Free Drink is Here!",
                    Body = EmailTemplates.MonthlyPromotionTemplate(customer.FirstName)
                };

                await _emailService.SendEmailAsync(email);

                // Update LastPromotionDate
                customer.LastPromotionDate = today;
            }

            await _context.SaveChangesAsync();
        }
    }
}
