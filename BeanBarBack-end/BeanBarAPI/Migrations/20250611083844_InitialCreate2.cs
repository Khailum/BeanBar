using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeanBar_Back_end.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Orders_OrderNum1",
                table: "Cart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_OrderNum1",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "ItemID",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "OrderNum1",
                table: "Cart");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "Cart");

            migrationBuilder.AddColumn<string>(
                name: "StockName",
                table: "Stock",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryOption",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_OrderNum",
                table: "Cart",
                column: "OrderNum");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Orders_OrderNum",
                table: "Cart",
                column: "OrderNum",
                principalTable: "Orders",
                principalColumn: "OrderNum",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Orders_OrderNum",
                table: "Cart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_OrderNum",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "StockName",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "DeliveryOption",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "Cart");

            migrationBuilder.AddColumn<int>(
                name: "ItemID",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Cart",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OrderNum1",
                table: "Cart",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_OrderNum1",
                table: "Cart",
                column: "OrderNum1");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Orders_OrderNum1",
                table: "Cart",
                column: "OrderNum1",
                principalTable: "Orders",
                principalColumn: "OrderNum",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
