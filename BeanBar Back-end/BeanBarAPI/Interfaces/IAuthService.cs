using System;
using BeanBarAPI.DTOs;

namespace BeanBarAPI.Interfaces
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterDTO dto);
        Task<UserDTO?> LoginAsync(LoginDTO dto);
    }

}
