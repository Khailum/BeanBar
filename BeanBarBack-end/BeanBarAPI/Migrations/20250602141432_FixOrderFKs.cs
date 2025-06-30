using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeanBar_Back_end.Migrations
{
    /// <inheritdoc />
    public partial class FixOrderFKs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmailSettings",
                columns: table => new
                {
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    From = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SmtpServer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Port = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailSettings", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "JwtSettings",
                columns: table => new
                {
                    SecretKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Issuer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Audience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccessTokenExpirationMinutes = table.Column<int>(type: "int", nullable: false),
                    RefreshTokenExpirationDays = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JwtSettings", x => x.SecretKey);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmailSettings");

            migrationBuilder.DropTable(
                name: "JwtSettings");
        }
    }
}
