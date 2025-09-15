using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoupleFinanceTracker.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

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

		[ForeignKey("CoupleId")]
		public Couple Couple { get; set; } 

		// Navigation properties
		public virtual ICollection<Transaction> Transactions { get; set; }
		public virtual ICollection<SavingsGoalContribution> SavingsGoalContributions { get; set; }
		public virtual ICollection<Comment> Comments { get; set; }
		public virtual ICollection<Expense> Expenses { get; set; } = new List<Expense>();

	}

    public class Couple
    {
        [Key]
        public int Id { get; set; }

        public string CoupleCode { get; set; }

        public int Partner1Id { get; set; }
        public int Partner2Id { get; set; }

        // Navigation
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<SavingsGoal> SavingsGoals { get; set; }
        public virtual ICollection<Budget> Budgets { get; set; }
    }

    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public decimal Amount { get; set; }

        public string Type { get; set; } // Income or Expense

        public string Category { get; set; } // Food or Rent .etc

        public string Date {  get; set; }   

        public bool IsShared { get; set; }  

        public int CreatedById { get; set; }

		[ForeignKey("CreatedById")]
		public virtual User CreatedBy { get; set; }

		public int CoupleId { get; set; }

		[ForeignKey("CoupleId")]
		public virtual Couple Couple { get; set; }

		public virtual ICollection<Receipt> Receipts { get; set; }
		public virtual ICollection<Comment> Comments { get; set; }
	}

	public class Budget
	{
		[Key]
		public int Id { get; set; }

		public string Name { get; set; }

		public decimal LimitAmount { get; set; }

		public string Type { get; set; } // "Individual" or "Shared"

		public string Category { get; set; } // Optional: Specific to rent, food, etc.

		public int UserId { get; set; }
		public int CoupleId { get; set; }

		public DateTime Month { get; set; }

		// Navigation
		public virtual User User { get; set; }
		public virtual Couple Couple { get; set; }
	}

	public class SavingsGoal
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Title { get; set; }

		public decimal TargetAmount { get; set; }

		public decimal CurrentAmount { get; set; } = 0;

		public DateTime? TargetDate { get; set; }

		public int CoupleId { get; set; }

		[ForeignKey(nameof(CoupleId))]
		public Couple Couple { get; set; }

		public ICollection<SavingsGoalContribution> Contributions { get; set; } = new List<SavingsGoalContribution>();
	}



	public class Receipt
	{
		[Key]
		public int Id { get; set; }

		public string FileUrl { get; set; }

		public string FileName { get; set; }

		public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

		public int TransactionId { get; set; }

		public int ExpenseId { get; set; }

		public Expense Expense { get; set; }

		[ForeignKey("TransactionId")]
		public virtual Transaction Transaction { get; set; }
	}

	public class Reminder
	{
		[Key]
		public int Id { get; set; }

		public string Title { get; set; }

		public DateTime ReminderDate { get; set; }

		public string Frequency { get; set; } // One-time, Monthly, Weekly

		public bool IsRecurring { get; set; }

		public bool IsNotified { get; set; }

		public int UserId { get; set; }

		[ForeignKey("UserId")]
		public virtual User User { get; set; }
	}


	public class Comment
	{
		[Key]
		public int Id { get; set; }

		public string Text { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public int UserId { get; set; }

		[ForeignKey("UserId")]
		public virtual User User { get; set; }
	}


	public class ActivityLog
	{
		[Key]
		public int Id { get; set; }

		public string Action { get; set; }

		public string Description { get; set; }

		public DateTime Timestamp { get; set; } = DateTime.UtcNow;

		public int UserId { get; set; }

		public int CoupleId { get; set; }

		public virtual User User { get; set; }

		public virtual Couple Couple { get; set; }
	}

	public class Expense
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public decimal Amount { get; set; }

		public string Category { get; set; }

		[Required]
		public DateTime Date { get; set; }

		public bool IsShared { get; set; }

		[Required]
		public int UserId { get; set; }

		public User User { get; set; }

		public virtual ICollection<Receipt> Receipts { get; set; }
		public virtual ICollection<Comment> Comments { get; set; }
	}

	public class Income
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public decimal Amount { get; set; }

		public string Source { get; set; }

		[Required]
		public DateTime Date { get; set; }

		[Required]
		public int UserId { get; set; }

		public User User { get; set; }
	}

	public class RecurringExpense
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public decimal Amount { get; set; }

		public string Frequency { get; set; } // e.g. Monthly, Weekly

		[Required]
		public int UserId { get; set; }

		[ForeignKey("UserId")]
		public User User { get; set; }

		public bool IsShared { get; set; }
	}

	public class SavingsGoalContribution
	{
		[Key]
		public int Id { get; set; }

		public int SavingsGoalId { get; set; }

		[ForeignKey("SavingsGoalId")]
		public virtual SavingsGoal SavingsGoal { get; set; }

		[Required]
		public int UserId { get; set; }   

		[ForeignKey("UserId")]
		public virtual User User { get; set; } 

		public decimal Amount { get; set; }

		public DateTime Date { get; set; } = DateTime.UtcNow;
	}



}
