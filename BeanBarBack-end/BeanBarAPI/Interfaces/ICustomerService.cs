using System.Threading.Tasks;

namespace BeanBarAPI.Interfaces
{
    public interface ICustomerService
    {
        Task SendBirthdayEmailsAsync();
        Task SendMonthlyPromotionsAsync();
    }
}
