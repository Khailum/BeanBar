using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeanBar_Back_end.Migrations
{
    /// <inheritdoc />
    public partial class CleanPaymentFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardDetails_Customers_CustomerID",
                table: "CardDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Orders_OrderNum",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_CustomerID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Menu_MenuItemID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_PromotionHistory_Customers_CustomerID",
                table: "PromotionHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_Customers_CustomerID",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Customers_CustomerID",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Customers_CustomerID",
                table: "TableReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Customers_CustomerID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "EmailSettings");

            migrationBuilder.DropTable(
                name: "JwtSettings");

            migrationBuilder.DropIndex(
                name: "IX_Users_CustomerID",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAuth",
                table: "UserAuth");

            migrationBuilder.DropIndex(
                name: "IX_Orders_MenuItemID",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_OrderNum",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "MenuItemID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Menu");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "Cart");

            migrationBuilder.RenameColumn(
                name: "isActive",
                table: "Users",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "FullName");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Users",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastPromotionDate",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UsersID",
                table: "UserAuth",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "UserAuth",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Occasion",
                table: "TableReservations",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "TableReservations",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "TableReservations",
                type: "nvarchar(80)",
                maxLength: 80,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Reviews",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "RefreshTokens",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ReplacedByToken",
                table: "RefreshTokens",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.AlterColumn<string>(
                name: "CardNumber",
                table: "CardDetails",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CVV",
                table: "CardDetails",
                type: "nvarchar(4)",
                maxLength: 4,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Accountholder",
                table: "CardDetails",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "AccountType",
                table: "CardDetails",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "AccountNumber",
                table: "CardDetails",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "OrderNum1",
                table: "Cart",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAuth",
                table: "UserAuth",
                column: "UsersID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ItemID",
                table: "Orders",
                column: "ItemID");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_OrderNum1",
                table: "Cart",
                column: "OrderNum1");

            migrationBuilder.AddForeignKey(
                name: "FK_CardDetails_Users_CustomerID",
                table: "CardDetails",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Orders_OrderNum1",
                table: "Cart",
                column: "OrderNum1",
                principalTable: "Orders",
                principalColumn: "OrderNum",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Menu_ItemID",
                table: "Orders",
                column: "ItemID",
                principalTable: "Menu",
                principalColumn: "ItemID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_CustomerID",
                table: "Orders",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PromotionHistory_Users_CustomerID",
                table: "PromotionHistory",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_Users_CustomerID",
                table: "RefreshTokens",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_CustomerID",
                table: "Reviews",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_Users_CustomerID",
                table: "TableReservations",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardDetails_Users_CustomerID",
                table: "CardDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Orders_OrderNum1",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Menu_ItemID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_CustomerID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_PromotionHistory_Users_CustomerID",
                table: "PromotionHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_Users_CustomerID",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_CustomerID",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Users_CustomerID",
                table: "TableReservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAuth",
                table: "UserAuth");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ItemID",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_OrderNum1",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastPromotionDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OrderNum1",
                table: "Cart");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "Cart");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Users",
                newName: "isActive");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Users",
                newName: "Username");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Users",
                type: "nvarchar(13)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(13)",
                oldMaxLength: 13,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "UserAuth",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "UsersID",
                table: "UserAuth",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Occasion",
                table: "TableReservations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "TableReservations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "TableReservations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(80)",
                oldMaxLength: 80,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "RefreshTokens",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "ReplacedByToken",
                table: "RefreshTokens",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Orders",
                type: "nvarchar(13)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "MenuItemID",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Menu",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CardNumber",
                table: "CardDetails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "CVV",
                table: "CardDetails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(4)",
                oldMaxLength: 4);

            migrationBuilder.AlterColumn<string>(
                name: "Accountholder",
                table: "CardDetails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "AccountType",
                table: "CardDetails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "AccountNumber",
                table: "CardDetails",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAuth",
                table: "UserAuth",
                column: "Email");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                column: "CartID");

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    CustomerID = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastPromotionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.CustomerID);
                });

            migrationBuilder.CreateTable(
                name: "EmailSettings",
                columns: table => new
                {
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    From = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Port = table.Column<int>(type: "int", nullable: false),
                    SmtpServer = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    AccessTokenExpirationMinutes = table.Column<int>(type: "int", nullable: false),
                    Audience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Issuer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefreshTokenExpirationDays = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JwtSettings", x => x.SecretKey);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_CustomerID",
                table: "Users",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MenuItemID",
                table: "Orders",
                column: "MenuItemID");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_OrderNum",
                table: "Cart",
                column: "OrderNum");

            migrationBuilder.AddForeignKey(
                name: "FK_CardDetails_Customers_CustomerID",
                table: "CardDetails",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Orders_OrderNum",
                table: "Cart",
                column: "OrderNum",
                principalTable: "Orders",
                principalColumn: "OrderNum",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customers_CustomerID",
                table: "Orders",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Menu_MenuItemID",
                table: "Orders",
                column: "MenuItemID",
                principalTable: "Menu",
                principalColumn: "ItemID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PromotionHistory_Customers_CustomerID",
                table: "PromotionHistory",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_Customers_CustomerID",
                table: "RefreshTokens",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Customers_CustomerID",
                table: "Reviews",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_Customers_CustomerID",
                table: "TableReservations",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Customers_CustomerID",
                table: "Users",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "CustomerID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
