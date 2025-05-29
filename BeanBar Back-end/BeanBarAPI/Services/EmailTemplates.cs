using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BeanBarAPI.Services
{
    public static class EmailTemplates
    {
        public static string WelcomeTemplate(string name) => $@"
        <h2>Welcome to BeanBar, {name}!</h2>
        <p>We're thrilled to have you join our community. Enjoy our premium brews and stay tuned for promotions!</p>";

        public static string BirthdayTemplate(string name) => $@"
        <h2>Happy Birthday, {name}! ??</h2>
        <p>Celebrate with a free drink on us today. Just show this email at the counter. Cheers!</p>";

        public static string MonthlyPromotionTemplate(string name) => $@"
        <h2>Hello {name},</h2>
        <p>Your loyalty is brewing something special! Here’s a free drink token for this month. Sip, savor, and enjoy!</p>";
    }

}