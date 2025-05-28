using System;
using System.Globalization;
using System.Linq;
using BeanBarAPI.DTOs;
using BeanBarAPI.Services;
using BeanBarAPI.Models;
using BeanBarAPI.Data;
using BeanBarAPI.Interfaces;
using System.Text.RegularExpressions;


namespace BeanBarAPI.Services
{
    public class IDValidationResult
    {
        public bool IsValid { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ValidationMessage { get; set; }
    }
    public interface IIDValidationService
    {
        IDValidationResult ValidateSouthAfricanID(string idNumber);
    }

    public class IDValidationService : IIDValidationService
    {
        /// <summary>
        /// Validates a South African ID number and extracts the date of birth.
        /// </summary>
        /// <param name="idNumber">The 13-digit SA ID number.</param>
        /// <returns>An IDValidationResult with validity and DOB info.</returns>
        public IDValidationResult ValidateSouthAfricanID(string idNumber)
        {
            if (string.IsNullOrWhiteSpace(idNumber))
            {
                return new IDValidationResult { IsValid = false, ValidationMessage = "ID number is required." };
            }

            if (idNumber.Length != 13 || !idNumber.All(char.IsDigit))
            {
                return new IDValidationResult { IsValid = false, ValidationMessage = "ID number must be 13 digits." };
            }

            if (!IsValidLuhn(idNumber))
            {
                return new IDValidationResult { IsValid = false, ValidationMessage = "ID number failed Luhn check." };
            }
            if (!Regex.IsMatch(idNumber, @"^\d{13}$"))
            {
                return new IDValidationResult { IsValid = false, ValidationMessage = "ID number format is invalid." };
            }


            var dob = ExtractDateOfBirth(idNumber);
            if (dob == null)
            {
                return new IDValidationResult { IsValid = false, ValidationMessage = "Invalid date of birth in ID." };
            }

            return new IDValidationResult
            {
                IsValid = true,
                DateOfBirth = dob,
                ValidationMessage = "ID number is valid."
            };
        }

        /// <summary>
        /// Extracts date of birth from the first 6 digits of the ID (YYMMDD).
        /// </summary>
        private DateTime? ExtractDateOfBirth(string id)
        {
            var dobPart = id.Substring(0, 6);

            // Try parse assuming the ID holder was born in 1900s or 2000s
            var formats = new[] { "yyMMdd" };

            if (DateTime.TryParseExact(dobPart, formats, CultureInfo.InvariantCulture,
                DateTimeStyles.None, out var date))
            {
                // Adjust century
                var currentYear = DateTime.Now.Year % 100;
                var century = (int.Parse(dobPart.Substring(0, 2)) <= currentYear) ? 2000 : 1900;
                return new DateTime(century + date.Year % 100, date.Month, date.Day);
            }

            return null;
        }

        /// <summary>
        /// Performs Luhn algorithm to validate ID number.
        /// </summary>
        private bool IsValidLuhn(string id)
        {
            int sum = 0;

            for (int i = 0; i < id.Length; i++)
            {
                int digit = int.Parse(id[i].ToString());

                if ((i % 2) == 0)
                {
                    sum += digit;
                }
                else
                {
                    int dbl = digit * 2;
                    sum += dbl > 9 ? dbl - 9 : dbl;
                }
            }

            return (sum % 10) == 0;
        }
    }
}
