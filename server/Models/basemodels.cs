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

		[ForeignKey(nameof(CoupleId))]
		public Couple Couple { get; set; }

		// Navigation properties
		public virtual ICollection<SavingsGoalContribution> SavingsGoalContributions { get; set; } = new List<SavingsGoalContribution>();
		public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
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
		public virtual ICollection<User> Users { get; set; } = new List<User>();
		public virtual ICollection<SavingsGoal> SavingsGoals { get; set; } = new List<SavingsGoal>();
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

	public class Comment
	{
		[Key]
		public int Id { get; set; }

		public string Text { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public int UserId { get; set; }

		[ForeignKey(nameof(UserId))]
		public virtual User User { get; set; }
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

		public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
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

	public class SavingsGoalContribution
	{
		[Key]
		public int Id { get; set; }

		public int SavingsGoalId { get; set; }

		[ForeignKey(nameof(SavingsGoalId))]
		public virtual SavingsGoal SavingsGoal { get; set; }

		[Required]
		public int UserId { get; set; }

		[ForeignKey(nameof(UserId))]
		public virtual User User { get; set; }

		public decimal Amount { get; set; }

		public DateTime Date { get; set; } = DateTime.UtcNow;
	}
}
