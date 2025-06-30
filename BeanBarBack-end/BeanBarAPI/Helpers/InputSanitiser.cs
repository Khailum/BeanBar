using System.Security.Claims;
using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Models;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;
using System.Net;

namespace BeanBarAPI.Helpers
{
    public static class InputSanitiser
    {
        public static string Sanitize(string input)
        {
            return string.IsNullOrWhiteSpace(input) ? input : WebUtility.HtmlEncode(input.Trim());
        }
    }
}