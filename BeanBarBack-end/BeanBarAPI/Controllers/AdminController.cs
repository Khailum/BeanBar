using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeanBarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] // Optional: restrict access to
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

        [HttpPut("users/{email}/role")]
        public async Task<IActionResult> ChangeUserRole(string email, [FromBody] string newRole)
        {
            var result = await _adminService.ChangeUserRoleAsync(email, newRole);
            if (!result) return NotFound("User not found.");
            return Ok("User role updated.");
        }

        [HttpPut("users/{email}/deactivate")]
        public async Task<IActionResult> DeactivateUser(string email)
        {
            var result = await _adminService.DeactivateUserAsync(email);
            if (!result) return NotFound("User not found.");
            return Ok("User deactivated.");
        }

        [HttpPost("audit-log")]
        public async Task<IActionResult> LogAdminAction([FromBody] AdminAuditDto logEntry)
        {
            await _adminService.LogAdminActionAsync(logEntry);
            return Ok("Action logged.");
        }

        [HttpGet("metrics")]
        public async Task<IActionResult> GetSystemMetrics()
        {
            var metrics = await _adminService.GetSystemMetricsAsync();
            return Ok(metrics);
        }
    }
}
