using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Models;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;

namespace BeanBar_Back_end.Services
{
    public interface IJwtService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
    }
}
