using Microsoft.AspNetCore.Mvc;
using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;

namespace BeanBarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            bool result = await _authService.RegisterAsync(dto);
            if (!result) return BadRequest("Username already exists.");
            return Ok("Registration successful.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _authService.LoginAsync(dto);
            if (user == null) return Unauthorized("Invalid username or password.");
            return Ok(user);
        }
    }
}
