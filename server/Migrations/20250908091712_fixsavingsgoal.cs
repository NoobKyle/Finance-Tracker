using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoupleFinanceTracker.Migrations
{
    public partial class fixsavingsgoal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoals_Couples_CoupleId1",
                table: "SavingsGoals");

            migrationBuilder.DropIndex(
                name: "IX_SavingsGoals_CoupleId1",
                table: "SavingsGoals");

            migrationBuilder.DropColumn(
                name: "CoupleId1",
                table: "SavingsGoals");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CoupleId1",
                table: "SavingsGoals",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SavingsGoals_CoupleId1",
                table: "SavingsGoals",
                column: "CoupleId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoals_Couples_CoupleId1",
                table: "SavingsGoals",
                column: "CoupleId1",
                principalTable: "Couples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
