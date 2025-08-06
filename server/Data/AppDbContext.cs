using Microsoft.EntityFrameworkCore;
using CoupleFinanceTracker.Models; // Replace with your actual models namespace

namespace CoupleFinanceTracker.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Couple> Couples { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<Budget> Budgets { get; set; }
		public DbSet<SavingsGoal> SavingsGoals { get; set; }
		public DbSet<SavingsGoalContribution> SavingsGoalContributions { get; set; }
		public DbSet<Receipt> Receipts { get; set; }
		public DbSet<Reminder> Reminders { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<ActivityLog> ActivityLogs { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Couple - Users (1:N)
			modelBuilder.Entity<Couple>()
				.HasMany(c => c.Users)
				.WithOne(u => u.Couple)
				.HasForeignKey(u => u.CoupleId)
				.OnDelete(DeleteBehavior.Restrict);

			// User - Transactions (1:N)
			modelBuilder.Entity<User>()
				.HasOne(u => u.Couple)
				.WithMany(c => c.Users)
				.HasForeignKey(u => u.CoupleId);

			// Transaction - Receipts (1:N)
			modelBuilder.Entity<Transaction>()
				.HasMany(t => t.Receipts)
				.WithOne(r => r.Transaction)
				.HasForeignKey(r => r.TransactionId)
				.OnDelete(DeleteBehavior.Cascade);

			// Transaction - Comments (1:N)
			modelBuilder.Entity<Transaction>()
				.HasMany(t => t.Comments)
				.WithOne(c => c.Transaction)
				.HasForeignKey(c => c.TransactionId)
				.OnDelete(DeleteBehavior.Cascade);

			// SavingsGoal - Contributions (1:N)
			modelBuilder.Entity<SavingsGoal>()
				.HasMany(sg => sg.Contributions)
				.WithOne(c => c.SavingsGoal)
				.HasForeignKey(c => c.SavingsGoalId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}