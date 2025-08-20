using System;

using System.ComponentModel.DataAnnotations;


namespace CoupleFinanceTracker.DTOs
{
	// -------- USERS --------
	public class UserCreateDto
	{
		[Required, EmailAddress]
		public string Email { get; set; }

		[Required]
		public string PasswordHash { get; set; }

		[Required]
		public string FullName { get; set; }

		public string IncomeSource { get; set; }

		public string Role { get; set; } = "Member";

		public int? CoupleId { get; set; }

		public bool IsLinkedToPartner { get; set; } = false;
	}

	public class UserReadDto
	{
		public int Id { get; set; }

		public string Email { get; set; }

		public string FullName { get; set; }

		public string IncomeSource { get; set; }

		public string Role { get; set; }

		public int CoupleId { get; set; }

		public bool IsLinkedToPartner { get; set; }
	}

	public class UserUpdateDto
	{
		[Required]
		public string FullName { get; set; }

		public string IncomeSource { get; set; }

		public string Role { get; set; }

		public int CoupleId { get; set; }

		public bool IsLinkedToPartner { get; set; }
	}



	// -------- COUPLES --------
	public class CoupleCreateDto
	{
		public string Name { get; set; }
	}
	public class CoupleReadDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}
	public class CoupleUpdateDto
	{
		public string Name { get; set; }
	}

	// -------- EXPENSES --------
	public class ExpenseCreateDto
	{
		public decimal Amount { get; set; }
		public string Category { get; set; }
		public DateTime Date { get; set; }
		public int UserId { get; set; }
		public bool IsShared { get; set; }
	}
	public class ExpenseReadDto
	{
		public int Id { get; set; }
		public decimal Amount { get; set; }
		public string Category { get; set; }
		public DateTime Date { get; set; }
		public bool IsShared { get; set; }
		public int UserId { get; set; }
	}
	public class ExpenseUpdateDto
	{
		public decimal Amount { get; set; }
		public string Category { get; set; }
		public bool IsShared { get; set; }
	}

	// -------- INCOMES --------
	public class IncomeCreateDto
	{
		public decimal Amount { get; set; }
		public string Source { get; set; }
		public DateTime Date { get; set; }
		public int UserId { get; set; }
	}
	public class IncomeReadDto
	{
		public int Id { get; set; }
		public decimal Amount { get; set; }
		public string Source { get; set; }
		public DateTime Date { get; set; }
		public int UserId { get; set; }
	}
	public class IncomeUpdateDto
	{
		public decimal Amount { get; set; }
		public string Source { get; set; }
	}

	// -------- BUDGETS --------
	public class BudgetCreateDto
	{
		public decimal Amount { get; set; }
		public string Category { get; set; }
		public int UserId { get; set; }
		public bool IsShared { get; set; }
	}
	public class BudgetReadDto
	{
		public int Id { get; set; }
		public decimal Amount { get; set; }
		public string Category { get; set; }
		public bool IsShared { get; set; }
	}
	public class BudgetUpdateDto
	{
		public decimal Amount { get; set; }
		public string Category { get; set; }
		public bool IsShared { get; set; }
	}

	// -------- SAVINGS GOALS --------
	public class SavingsGoalCreateDto
	{
		public string Name { get; set; }
		public decimal TargetAmount { get; set; }
		public int CoupleId { get; set; }
	}
	public class SavingsGoalReadDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public decimal TargetAmount { get; set; }
		public decimal CurrentAmount { get; set; }
	}
	public class SavingsGoalUpdateDto
	{
		public string Name { get; set; }
		public decimal TargetAmount { get; set; }
	}

	// -------- RECURRING EXPENSES --------
	public class RecurringExpenseCreateDto
	{
		public string Name { get; set; }
		public decimal Amount { get; set; }
		public string Frequency { get; set; }
		public int UserId { get; set; }
		public bool IsShared { get; set; }
	}
	public class RecurringExpenseReadDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public decimal Amount { get; set; }
		public string Frequency { get; set; }
		public bool IsShared { get; set; }
	}
	public class RecurringExpenseUpdateDto
	{
		public string Name { get; set; }
		public decimal Amount { get; set; }
		public string Frequency { get; set; }
		public bool IsShared { get; set; }
	}

	// -------- RECEIPTS --------
	public class ReceiptCreateDto
	{
		public string FileUrl { get; set; }
		public int ExpenseId { get; set; }
	}
	public class ReceiptReadDto
	{
		public int Id { get; set; }
		public string FileUrl { get; set; }
	}

	// -------- COMMENTS --------
	public class CommentCreateDto
	{
		public string Content { get; set; }
		public int ExpenseId { get; set; }
		public int UserId { get; set; }
	}
	public class CommentReadDto
	{
		public int Id { get; set; }
		public string Content { get; set; }
		public DateTime CreatedAt { get; set; }
	}
	public class CommentUpdateDto
	{
		public string Content { get; set; }
	}
}
