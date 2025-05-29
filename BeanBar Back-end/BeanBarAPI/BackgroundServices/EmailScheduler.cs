using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using BeanBarAPI.Services;

namespace BeanBarAPI.BackgroundServices
{
    public class EmailSchedulerService : BackgroundService
    {
        private readonly ILogger<EmailSchedulerService> _logger;
        private readonly ICustomerService _customerService;

        public EmailSchedulerService(ILogger<EmailSchedulerService> logger, ICustomerService customerService)
        {
            _logger = logger;
            _customerService = customerService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Email Scheduler Service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Run birthday emails daily at midnight
                    if (DateTime.Now.Hour == 0 && DateTime.Now.Minute == 0)
                    {
                        _logger.LogInformation("Sending birthday emails...");
                        await _customerService.SendBirthdayEmailsAsync();
                    }

                    // Run promotions on the 1st day of each month
                    if (DateTime.Now.Day == 1 && DateTime.Now.Hour == 0 && DateTime.Now.Minute == 5)
                    {
                        _logger.LogInformation("Sending monthly promotions...");
                        await _customerService.SendMonthlyPromotionsAsync();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while sending scheduled emails.");
                }

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Check every minute
            }

            _logger.LogInformation("Email Scheduler Service is stopping.");
        }
    }
}
