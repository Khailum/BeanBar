using BeanBarAPI.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BeanBarAPI.Interfaces
{
    public interface IAdminService
    {
        Task<List<UserDTO>> GetAllUsersAsync();
        Task<bool> ChangeUserRoleAsync(int userId, string newRole);
        Task<bool> DeactivateUserAsync(int userId);
        Task LogAdminActionAsync(AdminAuditDto logEntry);
        Task<SystemMetricsDto> GetSystemMetricsAsync();
    }
}
