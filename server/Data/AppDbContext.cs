using Microsoft.EntityFrameworkCore;
using CoupleFinanceTracker.Models; // Replace with your actual models namespace

namespace CoupleFinanceTracker.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Budget> Budgets { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<Goal> Goals { get; set; }
		public DbSet<Notification> Notifications { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Seed data
			modelBuilder.Entity<User>().HasData(
				new User { Id = 1, Email = "john@example.com", PasswordHash = "hashed123" },
				new User { Id = 2, Email = "jane@example.com", PasswordHash = "hashed456" }
			);
		}
	}
}