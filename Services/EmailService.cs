using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace BeanBarAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(EmailDTO email)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("BeanBar Coffee", _configuration["EmailSettings:From"]));
            emailMessage.To.Add(new MailboxAddress("", email.ToEmail));
            emailMessage.Subject = email.Subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = email.Body
            };

            emailMessage.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_configuration["EmailSettings:SmtpServer"], int.Parse(_configuration["EmailSettings:Port"]), SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_configuration["EmailSettings:Username"], _configuration["EmailSettings:Password"]);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }
    }
}
