using BeanBarAPI.Data;
using BeanBarAPI.DTOs;
using BeanBarAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BeanBarAPI.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly CoffeeDBcontext _context;

        public UserProfileService(CoffeeDBcontext context)
        {
            _context = context;
        }

        public async Task<UserProfileDto?> GetUserProfileAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null) return null;

            var customer = await _context.Users.FirstOrDefaultAsync(c => c.Email == email);

            var profile = new UserProfileDto
            {
                Email = user.Email,
                UserRole = user.UserRole,
                CustomerID = customer?.CustomerID,
                FullName = customer != null ? $"{customer.FullName}" : null,
                JoinedDate = customer?.CreatedAt
            };

            return profile;
        }
    }
}
