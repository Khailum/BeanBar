using BeanBarAPI.Data;
using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using BeanBarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BeanBarAPI.Services
{
    public class AdminService : IAdminService
    {
        private readonly CoffeeDBcontext _context;

        public AdminService(CoffeeDBcontext context)
        {
            _context = context;
        }

        public async Task<List<UserDTO>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(u => new UserDTO
                { 
                    Username = u.Username,
                    UserRole = u.UserRole,
                    IsActive = u.IsActive,
                    DateJoined = u.DateJoined
                }).ToListAsync();
        }

        public async Task<bool> ChangeUserRoleAsync(int userId, string newRole)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            user.Role = newRole;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeactivateUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            user.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task LogAdminActionAsync(AdminAuditDto logEntry)
        {
            var audit = new AuditLog
            {
                UserID = logEntry.AdminID,
                Action = logEntry.Action,
                Timestamp = logEntry.Timestamp
            };

            _context.AuditLogs.Add(audit);
            await _context.SaveChangesAsync();
        }

        public async Task<SystemMetricsDto> GetSystemMetricsAsync()
        {
            var totalUsers = await _context.Users.CountAsync();
            var activeUsers = await _context.Users.CountAsync(u => u.IsActive);
            var totalOrders = await _context.Orders.CountAsync();
            var totalRevenue = await _context.Orders.SumAsync(o => o.TotalAmount);

            return new SystemMetricsDto
            {
                TotalUsers = totalUsers,
                ActiveUsers = activeUsers,
                TotalOrders = totalOrders,
                TotalRevenue = totalRevenue
            };
        }
    }
}
