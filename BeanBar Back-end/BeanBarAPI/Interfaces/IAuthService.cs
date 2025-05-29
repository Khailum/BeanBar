using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Models;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;

namespace BeanBarAPI.Interfaces
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterDTO dto);
        Task<UserDTO?> LoginAsync(LoginDTO dto);
    }

}
