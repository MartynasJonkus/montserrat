using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedRefundPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Refunds_Orders_OrderId",
                table: "Refunds");

            migrationBuilder.DropIndex(
                name: "IX_Refunds_OrderId",
                table: "Refunds");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Refunds",
                newName: "RefundAmount_Amount");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Refunds",
                newName: "RefundAmount_Currency");

            migrationBuilder.AddColumn<int>(
                name: "MerchantId",
                table: "Refunds",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentId",
                table: "Refunds",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MerchantId",
                table: "Payments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RefundId",
                table: "Payments",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_MerchantId",
                table: "Refunds",
                column: "MerchantId");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_PaymentId",
                table: "Refunds",
                column: "PaymentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_MerchantId",
                table: "Payments",
                column: "MerchantId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Username",
                table: "Employees",
                column: "Username",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Merchants_MerchantId",
                table: "Payments",
                column: "MerchantId",
                principalTable: "Merchants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Refunds_Merchants_MerchantId",
                table: "Refunds",
                column: "MerchantId",
                principalTable: "Merchants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Refunds_Payments_PaymentId",
                table: "Refunds",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Merchants_MerchantId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Refunds_Merchants_MerchantId",
                table: "Refunds");

            migrationBuilder.DropForeignKey(
                name: "FK_Refunds_Payments_PaymentId",
                table: "Refunds");

            migrationBuilder.DropIndex(
                name: "IX_Refunds_MerchantId",
                table: "Refunds");

            migrationBuilder.DropIndex(
                name: "IX_Refunds_PaymentId",
                table: "Refunds");

            migrationBuilder.DropIndex(
                name: "IX_Payments_MerchantId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Employee_Username",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "MerchantId",
                table: "Refunds");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "Refunds");

            migrationBuilder.DropColumn(
                name: "MerchantId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "RefundId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "RefundAmount_Currency",
                table: "Refunds",
                newName: "OrderId");

            migrationBuilder.RenameColumn(
                name: "RefundAmount_Amount",
                table: "Refunds",
                newName: "TotalAmount");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_OrderId",
                table: "Refunds",
                column: "OrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Refunds_Orders_OrderId",
                table: "Refunds",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
