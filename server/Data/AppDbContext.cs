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
		public DbSet<Budget> Budgets { get; set; }
		public DbSet<SavingsGoal> SavingsGoals { get; set; }
		public DbSet<RecurringExpense> RecurringExpenses { get; set; }
		public DbSet<Receipt> Receipts { get; set; }
		public DbSet<Comment> Comments { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Relationships (adjust depending on your models)

			modelBuilder.Entity<User>()
				.HasMany<Expense>()
				.WithOne()
				.HasForeignKey(e => e.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<User>()
				.HasMany<Income>()
				.WithOne()
				.HasForeignKey(i => i.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<User>()
				.HasMany<Budget>()
				.WithOne()
				.HasForeignKey(b => b.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<User>()
				.HasMany<RecurringExpense>()
				.WithOne()
				.HasForeignKey(r => r.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Expense>()
				.HasOne(e => e.User)          
				.WithMany(u => u.Expenses)    
				.HasForeignKey(e => e.UserId) 
				.IsRequired();

			modelBuilder.Entity<Expense>()
				.HasMany<Receipt>()
				.WithOne()
				.HasForeignKey(r => r.ExpenseId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Expense>()
				.HasMany<Comment>()
				.WithOne()
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Couple>()
				.HasMany<SavingsGoal>()
				.WithOne()
				.HasForeignKey(s => s.CoupleId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Receipt>()
				.HasOne(r => r.Expense)
				.WithMany(e => e.Receipts)
				.HasForeignKey(r => r.ExpenseId);

			modelBuilder.Entity<Comment>()
				.HasOne(c => c.User)
				.WithMany(u => u.Comments)
				.HasForeignKey(c => c.UserId);


			modelBuilder.Entity<Income>()
				.HasOne(i => i.User)
				.WithMany()
				.HasForeignKey(i => i.UserId);

		}
	}
}
