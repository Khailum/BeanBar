using Microsoft.AspNetCore.Mvc;
using BeanBarAPI.Models;
using Microsoft.Extensions.Options;

namespace BeanBar_Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailSettingsController : ControllerBase
    {
        private readonly EmailSettings _emailSettings;

        public EmailSettingsController(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        // GET: api/EmailSettings
        [HttpGet]
        public ActionResult<object> GetEmailSettings()
        {
            // Return only non-sensitive info
            return Ok(new
            {
                From = _emailSettings.From,
                SmtpServer = _emailSettings.SmtpServer,
                Port = _emailSettings.Port,
                Username = _emailSettings.Username
                // Don't return password!
            });
        }
    }
}
