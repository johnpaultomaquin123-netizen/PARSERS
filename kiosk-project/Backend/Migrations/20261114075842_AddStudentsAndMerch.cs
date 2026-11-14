using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddStudentsAndMerch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KioskItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    SubCategory = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    Badge = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KioskItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SchoolId = table.Column<string>(type: "TEXT", nullable: false),
                    BirthDate = table.Column<string>(type: "TEXT", nullable: true),
                    WalletBalance = table.Column<decimal>(type: "TEXT", nullable: false),
                    RewardPoints = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "KioskItems",
                columns: new[] { "Id", "Badge", "Category", "ImageUrl", "Name", "Price", "SubCategory" },
                values: new object[,]
                {
                    { 1, null, "Shirts", "/images/dept_shirt_v1.png", "Dept Shirt V.1", 500.00m, "Polo Shirts" },
                    { 2, null, "Shirts", "/images/dept_shirt_v2.png", "Dept Shirt V.2", 500.00m, "Polo Shirts" },
                    { 3, "A must", "Shirts", "/images/school_uniform.png", "School Uniform", 1500.00m, "Uniform" },
                    { 4, "Bestseller", "Bags", "/images/parser_backpack.png", "Parser Backpack", 500.00m, "Backpack" },
                    { 5, null, "Caps", "/images/cap_2090.png", "Cap 2090", 400.00m, "All" },
                    { 6, null, "Lanyards", "/images/lanyard_v1.png", "Lanyard V.1", 80.00m, "All" }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "BirthDate", "RewardPoints", "SchoolId", "WalletBalance" },
                values: new object[] { 1, "2004-01-01", 220, "2026-0001", 15.00m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KioskItems");

            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}
