using BeanBarAPI.DTOs;
using System.Threading.Tasks;

namespace BeanBarAPI.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailDTO email);
    }
}
