using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class BetterCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.AddColumn<string>(
                name: "Address_Address1",
                table: "Merchants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Address2",
                table: "Merchants",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_City",
                table: "Merchants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Country",
                table: "Merchants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_CountryCode",
                table: "Merchants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_ZipCode",
                table: "Merchants",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_Address1",
                table: "Merchants");

            migrationBuilder.DropColumn(
                name: "Address_Address2",
                table: "Merchants");

            migrationBuilder.DropColumn(
                name: "Address_City",
                table: "Merchants");

            migrationBuilder.DropColumn(
                name: "Address_Country",
                table: "Merchants");

            migrationBuilder.DropColumn(
                name: "Address_CountryCode",
                table: "Merchants");

            migrationBuilder.DropColumn(
                name: "Address_ZipCode",
                table: "Merchants");

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    MerchantId = table.Column<int>(type: "integer", nullable: false),
                    Address1 = table.Column<string>(type: "text", nullable: false),
                    Address2 = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    CountryCode = table.Column<string>(type: "text", nullable: false),
                    ZipCode = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.MerchantId);
                    table.ForeignKey(
                        name: "FK_Addresses_Merchants_MerchantId",
                        column: x => x.MerchantId,
                        principalTable: "Merchants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
