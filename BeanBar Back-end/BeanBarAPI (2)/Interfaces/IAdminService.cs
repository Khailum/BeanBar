using BeanBarAPI.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using BeanBarAPI.Interfaces;


namespace BeanBarAPI.Interfaces
{
    public interface IAdminService
    {
        Task<List<UserDTO>> GetAllUsersAsync();
        Task<bool> ChangeUserRoleAsync(string userEmail, string newRole);
        Task<bool> DeactivateUserAsync(string userEmail);
        Task LogAdminActionAsync(AdminAuditDto logEntry);
        Task<SystemMetricsDto> GetSystemMetricsAsync();
    }
}
