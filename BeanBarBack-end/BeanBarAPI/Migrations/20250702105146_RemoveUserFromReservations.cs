using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeanBar_Back_end.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserFromReservations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Users_CustomerID",
                table: "TableReservations");

            migrationBuilder.DropIndex(
                name: "IX_TableReservations_CustomerID",
                table: "TableReservations");

            migrationBuilder.DropColumn(
                name: "CustomerID",
                table: "TableReservations");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "TableReservations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryOption",
                table: "Cart",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Cart",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "TableReservations");

            migrationBuilder.DropColumn(
                name: "DeliveryOption",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Cart");

            migrationBuilder.AddColumn<string>(
                name: "CustomerID",
                table: "TableReservations",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_TableReservations_CustomerID",
                table: "TableReservations",
                column: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_Users_CustomerID",
                table: "TableReservations",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
