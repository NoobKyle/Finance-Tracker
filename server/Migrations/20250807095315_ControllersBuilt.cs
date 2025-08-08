using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CoupleFinanceTracker.Migrations
{
    public partial class ControllersBuilt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Transactions_TransactionId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Transactions_TransactionId",
                table: "Receipts");

            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContributions_SavingsGoals_SavingsGoalId",
                table: "SavingsGoalContributions");

            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContributions_Users_UserId",
                table: "SavingsGoalContributions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Couples_CoupleId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Users_CreatedById",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Couples_CoupleId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ActivityLogs");

            migrationBuilder.DropTable(
                name: "Reminders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavingsGoalContributions",
                table: "SavingsGoalContributions");

            migrationBuilder.RenameTable(
                name: "Transactions",
                newName: "Transaction");

            migrationBuilder.RenameTable(
                name: "SavingsGoalContributions",
                newName: "SavingsGoalContribution");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_CreatedById",
                table: "Transaction",
                newName: "IX_Transaction_CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_CoupleId",
                table: "Transaction",
                newName: "IX_Transaction_CoupleId");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContributions_UserId",
                table: "SavingsGoalContribution",
                newName: "IX_SavingsGoalContribution_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContributions_SavingsGoalId",
                table: "SavingsGoalContribution",
                newName: "IX_SavingsGoalContribution_SavingsGoalId");

            migrationBuilder.AddColumn<int>(
                name: "CoupleId1",
                table: "SavingsGoals",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExpenseId",
                table: "Receipts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExpenseId",
                table: "Comments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Budgets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transaction",
                table: "Transaction",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavingsGoalContribution",
                table: "SavingsGoalContribution",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsShared = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    UserId1 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expenses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Expenses_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Incomes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Source = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    UserId1 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incomes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Incomes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Incomes_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecurringExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Frequency = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    UserId1 = table.Column<int>(type: "integer", nullable: false),
                    IsShared = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecurringExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecurringExpenses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecurringExpenses_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavingsGoals_CoupleId1",
                table: "SavingsGoals",
                column: "CoupleId1");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_ExpenseId",
                table: "Receipts",
                column: "ExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ExpenseId",
                table: "Comments",
                column: "ExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_Budgets_UserId1",
                table: "Budgets",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_UserId",
                table: "Expenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_UserId1",
                table: "Expenses",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_UserId",
                table: "Incomes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_UserId1",
                table: "Incomes",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_RecurringExpenses_UserId",
                table: "RecurringExpenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RecurringExpenses_UserId1",
                table: "RecurringExpenses",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_Users_UserId1",
                table: "Budgets",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Expenses_ExpenseId",
                table: "Comments",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Transaction_TransactionId",
                table: "Comments",
                column: "TransactionId",
                principalTable: "Transaction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Expenses_ExpenseId",
                table: "Receipts",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Transaction_TransactionId",
                table: "Receipts",
                column: "TransactionId",
                principalTable: "Transaction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.AddForeignKey(
                name: "FK_SavingsGoals_Couples_CoupleId1",
                table: "SavingsGoals",
                column: "CoupleId1",
                principalTable: "Couples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_Couples_CoupleId",
                table: "Transaction",
                column: "CoupleId",
                principalTable: "Couples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_Users_CreatedById",
                table: "Transaction",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Couples_CoupleId",
                table: "Users",
                column: "CoupleId",
                principalTable: "Couples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_Users_UserId1",
                table: "Budgets");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Expenses_ExpenseId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Transaction_TransactionId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Expenses_ExpenseId",
                table: "Receipts");

            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Transaction_TransactionId",
                table: "Receipts");

            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContribution_SavingsGoals_SavingsGoalId",
                table: "SavingsGoalContribution");

            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoalContribution_Users_UserId",
                table: "SavingsGoalContribution");

            migrationBuilder.DropForeignKey(
                name: "FK_SavingsGoals_Couples_CoupleId1",
                table: "SavingsGoals");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_Couples_CoupleId",
                table: "Transaction");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_Users_CreatedById",
                table: "Transaction");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Couples_CoupleId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Incomes");

            migrationBuilder.DropTable(
                name: "RecurringExpenses");

            migrationBuilder.DropIndex(
                name: "IX_SavingsGoals_CoupleId1",
                table: "SavingsGoals");

            migrationBuilder.DropIndex(
                name: "IX_Receipts_ExpenseId",
                table: "Receipts");

            migrationBuilder.DropIndex(
                name: "IX_Comments_ExpenseId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Budgets_UserId1",
                table: "Budgets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transaction",
                table: "Transaction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavingsGoalContribution",
                table: "SavingsGoalContribution");

            migrationBuilder.DropColumn(
                name: "CoupleId1",
                table: "SavingsGoals");

            migrationBuilder.DropColumn(
                name: "ExpenseId",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "ExpenseId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Budgets");

            migrationBuilder.RenameTable(
                name: "Transaction",
                newName: "Transactions");

            migrationBuilder.RenameTable(
                name: "SavingsGoalContribution",
                newName: "SavingsGoalContributions");

            migrationBuilder.RenameIndex(
                name: "IX_Transaction_CreatedById",
                table: "Transactions",
                newName: "IX_Transactions_CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Transaction_CoupleId",
                table: "Transactions",
                newName: "IX_Transactions_CoupleId");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContribution_UserId",
                table: "SavingsGoalContributions",
                newName: "IX_SavingsGoalContributions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SavingsGoalContribution_SavingsGoalId",
                table: "SavingsGoalContributions",
                newName: "IX_SavingsGoalContributions_SavingsGoalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavingsGoalContributions",
                table: "SavingsGoalContributions",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ActivityLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CoupleId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Action = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityLogs_Couples_CoupleId",
                        column: x => x.CoupleId,
                        principalTable: "Couples",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reminders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Frequency = table.Column<string>(type: "text", nullable: false),
                    IsNotified = table.Column<bool>(type: "boolean", nullable: false),
                    IsRecurring = table.Column<bool>(type: "boolean", nullable: false),
                    ReminderDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reminders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reminders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_CoupleId",
                table: "ActivityLogs",
                column: "CoupleId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_UserId",
                table: "ActivityLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reminders_UserId",
                table: "Reminders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Transactions_TransactionId",
                table: "Comments",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Transactions_TransactionId",
                table: "Receipts",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Couples_CoupleId",
                table: "Transactions",
                column: "CoupleId",
                principalTable: "Couples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Users_CreatedById",
                table: "Transactions",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Couples_CoupleId",
                table: "Users",
                column: "CoupleId",
                principalTable: "Couples",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
