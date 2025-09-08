using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoupleFinanceTracker.Migrations
{
    public partial class addSavingsGoalcontributions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContribution_SavingsGoals_SavingsGoalId",
                table: "SavingsGoalContribution");

            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContribution_Users_UserId",
                table: "SavingsGoalContribution");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavingsGoalContribution",
                table: "SavingsGoalContribution");

            migrationBuilder.RenameTable(
                name: "SavingsGoalContribution",
                newName: "SavingsGoalContributions");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContribution_UserId",
                table: "SavingsGoalContributions",
                newName: "IX_SavingsGoalContributions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContribution_SavingsGoalId",
                table: "SavingsGoalContributions",
                newName: "IX_SavingsGoalContributions_SavingsGoalId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "SavingsGoalContributions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavingsGoalContributions",
                table: "SavingsGoalContributions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoalContributions_SavingsGoals_SavingsGoalId",
                table: "SavingsGoalContributions",
                column: "SavingsGoalId",
                principalTable: "SavingsGoals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoalContributions_Users_UserId",
                table: "SavingsGoalContributions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContributions_SavingsGoals_SavingsGoalId",
                table: "SavingsGoalContributions");

            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContributions_Users_UserId",
                table: "SavingsGoalContributions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavingsGoalContributions",
                table: "SavingsGoalContributions");

            migrationBuilder.RenameTable(
                name: "SavingsGoalContributions",
                newName: "SavingsGoalContribution");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContributions_UserId",
                table: "SavingsGoalContribution",
                newName: "IX_SavingsGoalContribution_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContributions_SavingsGoalId",
                table: "SavingsGoalContribution",
                newName: "IX_SavingsGoalContribution_SavingsGoalId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "SavingsGoalContribution",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavingsGoalContribution",
                table: "SavingsGoalContribution",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoalContribution_SavingsGoals_SavingsGoalId",
                table: "SavingsGoalContribution",
                column: "SavingsGoalId",
                principalTable: "SavingsGoals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoalContribution_Users_UserId",
                table: "SavingsGoalContribution",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
