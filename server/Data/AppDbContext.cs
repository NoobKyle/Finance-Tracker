using Microsoft.EntityFrameworkCore;
using CoupleFinanceTracker.Models;

namespace CoupleFinanceTracker.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		// DbSets for all entities
		public DbSet<User> Users { get; set; }
		public DbSet<Couple> Couples { get; set; }
		public DbSet<Expense> Expenses { get; set; }
		public DbSet<Income> Incomes { get; set; }
		public DbSet<SavingsGoal> SavingsGoals { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<SavingsGoalContribution> SavingsGoalContributions { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Relationships (adjust depending on your models)

			// User → Expense
			modelBuilder.Entity<User>()
				.HasMany<Expense>()
				.WithOne()
				.HasForeignKey(e => e.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			// User → Income
			modelBuilder.Entity<User>()
				.HasMany<Income>()
				.WithOne()
				.HasForeignKey(i => i.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			// Expense → User
			modelBuilder.Entity<Expense>()
				.HasOne(e => e.User)
				.WithMany(u => u.Expenses)
				.HasForeignKey(e => e.UserId)
				.IsRequired();

			// Expense → Comment
			modelBuilder.Entity<Expense>()
				.HasMany<Comment>()
				.WithOne()
				.OnDelete(DeleteBehavior.Cascade);

			// Couple → SavingsGoal
			modelBuilder.Entity<Couple>()
				.HasMany<SavingsGoal>()
				.WithOne()
				.HasForeignKey(s => s.CoupleId)
				.OnDelete(DeleteBehavior.Cascade);

			// Comment → User
			modelBuilder.Entity<Comment>()
				.HasOne(c => c.User)
				.WithMany(u => u.Comments)
				.HasForeignKey(c => c.UserId);

			// Income → User
			modelBuilder.Entity<Income>()
				.HasOne(i => i.User)
				.WithMany()
				.HasForeignKey(i => i.UserId);

			// SavingsGoal → Couple
			modelBuilder.Entity<SavingsGoal>()
				.HasOne(g => g.Couple)
				.WithMany(c => c.SavingsGoals)
				.HasForeignKey(g => g.CoupleId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
