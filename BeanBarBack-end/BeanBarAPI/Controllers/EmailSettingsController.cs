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
        public ActionResult<EmailSettings> GetEmailSettings()
        {
            return Ok(_emailSettings);
        }
    }
}