using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeanBarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")] // Optional: restrict access to Admins
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPost("change-role")]
        public async Task<IActionResult> ChangeUserRole([FromQuery] string email, [FromQuery] string newRole)
        {
            var success = await _adminService.ChangeUserRoleAsync(email, newRole);
            if (!success) return NotFound("User not found");
            return Ok("User role updated");
        }

        [HttpPost("deactivate")]
        public async Task<IActionResult> DeactivateUser([FromQuery] string email)
        {
            var success = await _adminService.DeactivateUserAsync(email);
            if (!success) return NotFound("User not found");
            return Ok("User deactivated");
        }

        [HttpPost("log-action")]
        public async Task<IActionResult> LogAdminAction([FromBody] AdminAuditDto dto)
        {
            await _adminService.LogAdminActionAsync(dto);
            return Ok("Action logged");
        }

        [HttpGet("metrics")]
        public async Task<IActionResult> GetSystemMetrics()
        {
            var metrics = await _adminService.GetSystemMetricsAsync();
            return Ok(metrics);
        }
    }
}



