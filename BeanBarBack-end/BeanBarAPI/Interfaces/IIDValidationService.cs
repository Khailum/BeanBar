using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Models;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;

namespace BeanBarAPI.Interfaces
{
    public interface IIDValidationService
    {
        bool IsValidSouthAfricanID(string idNumber);
        IDValidationResult ValidateSouthAfricanID(string idNumber);
    }
}
