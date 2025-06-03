namespace BeanBarAPI.Services
{
    public static class EmailTemplates
    {
        private static string BuildTemplate(string title, string body, string name)
        {
            return $@"
                <div style='font-family: Arial, sans-serif; padding: 20px; background-color: #fffbea; color: #4b3832;'>
                    <h2 style='color: #6f4e37;'>{title}, {name}!</h2>
                    <p style='font-size: 16px;'>{body}</p>
                    <hr style='margin-top: 30px;' />
                    <p style='font-size: small; color: gray;'>BeanBar Coffee • Love in every cup</p>
                </div>";
        }

        public static string WelcomeTemplate(string name) =>
            BuildTemplate("Welcome to BeanBar",
                         "We're thrilled to have you join our community. Enjoy our premium brews and stay tuned for promotions!",
                         name);

        public static string BirthdayTemplate(string name) =>
            BuildTemplate("Happy Birthday",
                         "Celebrate with a free drink on us today. Just show this email at the counter. Cheers!",
                         name);

        public static string MonthlyPromotionTemplate(string name) =>
            BuildTemplate("Hello",
                         "Your loyalty is brewing something special! Here’s a free drink token for this month. Sip, savor, and enjoy!",
                         name);
    }
}
