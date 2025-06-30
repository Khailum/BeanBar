using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeanBar_Back_end.Migrations
{
    /// <inheritdoc />
    public partial class CheckStockFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stock_Menu_MenuItemItemID",
                table: "Stock");

            migrationBuilder.DropIndex(
                name: "IX_Stock_MenuItemItemID",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "ItemID",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "MenuItemItemID",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Customers");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Users",
                type: "nvarchar(13)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "UsersID",
                table: "UserAuth",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "TableReservations",
                type: "nvarchar(13)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Reviews",
                type: "nvarchar(13)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "RefreshTokens",
                type: "nvarchar(13)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "OrderNum",
                table: "Payments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Orders",
                type: "nvarchar(13)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "MenuItemID",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderNum",
                table: "Deliveries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(15)",
                oldMaxLength: 15);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Customers",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "CardDetails",
                type: "nvarchar(13)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    CartID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderNum = table.Column<int>(type: "int", nullable: false),
                    ItemID = table.Column<int>(type: "int", nullable: false),
                    ItemName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ItemType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ItemDescription = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.CartID);
                    table.ForeignKey(
                        name: "FK_Cart_Orders_OrderNum",
                        column: x => x.OrderNum,
                        principalTable: "Orders",
                        principalColumn: "OrderNum",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TableReservations_CustomerID",
                table: "TableReservations",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_CustomerID",
                table: "Reviews",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_CustomerID",
                table: "RefreshTokens",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OrderNum",
                table: "Payments",
                column: "OrderNum");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerID",
                table: "Orders",
                column: "CustomerID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MenuItemID",
                table: "Orders",
                column: "MenuItemID");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_OrderNum",
                table: "Deliveries",
                column: "OrderNum");

            migrationBuilder.CreateIndex(
                name: "IX_CardDetails_CustomerID",
                table: "CardDetails",
                column: "CustomerID");

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
                name: "FK_Deliveries_Orders_OrderNum",
                table: "Deliveries",
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
                name: "FK_Payments_Orders_OrderNum",
                table: "Payments",
                column: "OrderNum",
                principalTable: "Orders",
                principalColumn: "OrderNum",
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardDetails_Customers_CustomerID",
                table: "CardDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Deliveries_Orders_OrderNum",
                table: "Deliveries");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_CustomerID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Menu_MenuItemID",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Orders_OrderNum",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_Customers_CustomerID",
                table: "RefreshTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Customers_CustomerID",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Customers_CustomerID",
                table: "TableReservations");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_TableReservations_CustomerID",
                table: "TableReservations");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_CustomerID",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_RefreshTokens_CustomerID",
                table: "RefreshTokens");

            migrationBuilder.DropIndex(
                name: "IX_Payments_OrderNum",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CustomerID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_MenuItemID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Deliveries_OrderNum",
                table: "Deliveries");

            migrationBuilder.DropIndex(
                name: "IX_CardDetails_CustomerID",
                table: "CardDetails");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UsersID",
                table: "UserAuth");

            migrationBuilder.DropColumn(
                name: "OrderNum",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "MenuItemID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderNum",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Customers");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Users",
                type: "nvarchar(20)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "TableReservations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.AddColumn<int>(
                name: "ItemID",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MenuItemItemID",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "RefreshTokens",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Customers",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Customers",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "Customers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)",
                oldMaxLength: 13);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Customers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Customers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerID",
                table: "CardDetails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_MenuItemItemID",
                table: "Stock",
                column: "MenuItemItemID");

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_Menu_MenuItemItemID",
                table: "Stock",
                column: "MenuItemItemID",
                principalTable: "Menu",
                principalColumn: "ItemID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
