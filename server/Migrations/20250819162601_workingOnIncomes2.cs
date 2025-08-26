using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoupleFinanceTracker.Migrations
{
    public partial class workingOnIncomes2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_Users_UserId1",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_UserId1",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Incomes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Incomes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_UserId1",
                table: "Incomes",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_Users_UserId1",
                table: "Incomes",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
