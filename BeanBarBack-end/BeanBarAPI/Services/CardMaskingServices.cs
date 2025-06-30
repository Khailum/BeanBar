namespace BeanBarAPI.Services
{
    public class CardMaskingService
    {
        public string MaskCardNumber(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber) || cardNumber.Length < 4)
                return "****";

            string last4 = cardNumber[^4..];
            return new string('*', cardNumber.Length - 4) + last4;
        }
    }
}
