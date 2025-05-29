using System.Threading.Tasks;
using BeanBarAPI.DTOs;

namespace BeanBarAPI.Interfaces
{
    public interface IUserProfileService
    {
        Task<UserProfileDto?> GetUserProfileAsync(string email);
    }
}
