namespace BeanBar_Back_end.DTOs
{
    public class CardDetailsDTO
    {
        public string AccountNumber { get; set; }

        public string Accountholder { get; set; }

        public string CardNumber { get; set; }

        public string CVV { get; set; }

        public DateTime ExpiryDate { get; set; }
        
        public string AccountType { get; set; }


    }
}
