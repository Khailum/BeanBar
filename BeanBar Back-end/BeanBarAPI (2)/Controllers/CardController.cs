using Microsoft.AspNetCore.Mvc;
using BeanBarAPI.Services;

namespace BeanBarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        private readonly CardMaskingService _cardMaskingService;

        public CardController(CardMaskingService cardMaskingService)
        {
            _cardMaskingService = cardMaskingService;
        }

        // GET api/card/mask?cardNumber=1234567890123456
        [HttpGet("mask")]
        public IActionResult MaskCardNumber([FromQuery] string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
                return BadRequest("Card number is required.");

            var masked = _cardMaskingService.MaskCardNumber(cardNumber);
            return Ok(new { MaskedCardNumber = masked });
        }
    }
}
