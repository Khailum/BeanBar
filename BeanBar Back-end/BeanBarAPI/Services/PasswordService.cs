using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using BeanBarAPI.Models;
using BeanBarAPI.Interfaces;

namespace BeanBarAPI.Services
{
    public class PasswordService : IPasswordService
    {
        public string GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }

        public string HashPassword(string password, string salt)
        {
            byte[] saltBytes = Convert.FromBase64String(salt);
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
            ));
        }

        public bool VerifyPassword(string password, string hashedPassword, string salt)
        {
            string hashOfInput = HashPassword(password, salt);
            return hashOfInput == hashedPassword;
        }
    }
}
