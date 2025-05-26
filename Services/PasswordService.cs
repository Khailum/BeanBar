using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CoffeeShopAPI.Services
{
    public class PasswordHasher
    {
        // Generate a new salt
        public static string GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }

        // Hash the password with a given salt
        public static string HashPassword(string password, string salt)
        {
            byte[] saltBytes = Convert.FromBase64String(salt);
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
            ));
            return hashed;
        }

        // Verify the password
        public static bool VerifyPassword(string password, string hashedPassword, string salt)
        {
            var hashOfInput = HashPassword(password, salt);
            return hashOfInput == hashedPassword;
        }
    }
}
