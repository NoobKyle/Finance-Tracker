using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoupleFinanceTracker.Migrations
{
    public partial class FixedSavingsContribution : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContributions_Users_UserId",
                table: "SavingsGoalContributions");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "SavingsGoalContributions",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoalContributions_Users_UserId",
                table: "SavingsGoalContributions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContributions_Users_UserId",
                table: "SavingsGoalContributions");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "SavingsGoalContributions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoalContributions_Users_UserId",
                table: "SavingsGoalContributions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
