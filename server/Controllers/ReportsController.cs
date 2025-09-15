using AutoMapper;
using CoupleFinanceTracker.DTOs;
using CoupleFinanceTracker.Data;
using CoupleFinanceTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Globalization;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ReportsController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public ReportsController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		// GET: api/reports/income-vs-expense?coupleId=1&start=2025-01-01&end=2025-01-31
		[HttpGet("income-vs-expense")]
		public async Task<ActionResult<IncomeVsExpenseDto>> GetIncomeVsExpense(
			[FromQuery] int coupleId,
			[FromQuery] DateTime? start,
			[FromQuery] DateTime? end)
		{
			var startDate = start ?? new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1, 0, 0, 0, DateTimeKind.Utc);
			var endDate = end ?? startDate.AddMonths(1).AddTicks(-1);


			var totalIncome = await _context.Incomes
				.Where(i => i.User.CoupleId == coupleId && i.Date >= startDate && i.Date <= endDate)
				.SumAsync(i => (decimal?)i.Amount) ?? 0;

			var totalExpense = await _context.Expenses
				.Where(e => e.User.CoupleId == coupleId && e.Date >= startDate && e.Date <= endDate)
				.SumAsync(e => (decimal?)e.Amount) ?? 0;

			var dto = new IncomeVsExpenseDto
			{
				TotalIncome = totalIncome,
				TotalExpense = totalExpense,
				Net = totalIncome - totalExpense
			};

			return Ok(dto);
		}


		// GET: api/reports/expense-trend?coupleId=1&period=monthly
		[HttpGet("expense-trend")]
		public async Task<ActionResult<IEnumerable<ExpenseTrendDto>>> GetExpenseTrend(
			[FromQuery] int coupleId,
			[FromQuery] string period = "monthly")
		{
			var expensesList = await _context.Expenses
				.Where(e => e.User.CoupleId == coupleId)
				.ToListAsync();

			var grouped = (period.ToLower() == "weekly")
				? expensesList
					.GroupBy(e => new { Year = e.Date.Year, Week = ISOWeek.GetWeekOfYear(e.Date) })
					.Select(g => new ExpenseTrendDto
					{
						PeriodLabel = $"{g.Key.Year}-W{g.Key.Week}",
						TotalExpense = g.Sum(x => x.Amount)
					})
					.ToList()
				: expensesList
					.GroupBy(e => new { e.Date.Year, e.Date.Month })
					.Select(g => new ExpenseTrendDto
					{
						PeriodLabel = $"{g.Key.Year}-{g.Key.Month:D2}",
						TotalExpense = g.Sum(x => x.Amount)
					})
					.ToList();

			return Ok(grouped);
		}


		// GET: api/reports/monthly-view?coupleId=1
		[HttpGet("monthly-view")]
		public async Task<ActionResult<IEnumerable<MonthlyViewDto>>> GetMonthlyView([FromQuery] int coupleId)
		{
			var incomes = _context.Incomes.Where(i => i.User.CoupleId == coupleId);
			var expenses = _context.Expenses.Where(e => e.User.CoupleId == coupleId);

			var incomeGroup = incomes
				.GroupBy(i => new { i.Date.Year, i.Date.Month })
				.Select(g => new
				{
					Period = $"{g.Key.Year}-{g.Key.Month:D2}",
					TotalIncome = g.Sum(x => x.Amount)
				});

			var expenseGroup = expenses
				.GroupBy(e => new { e.Date.Year, e.Date.Month })
				.Select(g => new
				{
					Period = $"{g.Key.Year}-{g.Key.Month:D2}",
					TotalExpense = g.Sum(x => x.Amount)
				});

			var incomeList = await incomeGroup.ToListAsync();
			var expenseList = await expenseGroup.ToListAsync();

			var periods = incomeList.Select(x => x.Period)
				.Union(expenseList.Select(x => x.Period))
				.Distinct();

			var result = periods.Select(period => new MonthlyViewDto
			{
				Period = period,
				TotalIncome = incomeList.FirstOrDefault(x => x.Period == period)?.TotalIncome ?? 0,
				TotalExpense = expenseList.FirstOrDefault(x => x.Period == period)?.TotalExpense ?? 0,
				Net = (incomeList.FirstOrDefault(x => x.Period == period)?.TotalIncome ?? 0) -
					  (expenseList.FirstOrDefault(x => x.Period == period)?.TotalExpense ?? 0)
			});

			return Ok(result);
		}

		// GET: api/reports/goal-contribution-breakdown?coupleId=1
		[HttpGet("goal-contribution-breakdown")]
		public async Task<ActionResult<IEnumerable<GoalContributionBreakdownDto>>> GetGoalContributionBreakdown(
			[FromQuery] int coupleId)
		{
			var contributions = await _context.SavingsGoalContributions
				.Where(c => c.SavingsGoal.CoupleId == coupleId)
				.GroupBy(c => new { c.SavingsGoalId, c.UserId })
				.Select(g => new
				{
					GoalId = g.Key.SavingsGoalId,
					UserId = g.Key.UserId,
					TotalContributed = g.Sum(x => x.Amount)
				})
				.ToListAsync();

			var goals = await _context.SavingsGoals
				.Where(g => g.CoupleId == coupleId)
				.ToListAsync();

			var dtoList = contributions.Select(c => new GoalContributionBreakdownDto
			{
				GoalId = c.GoalId,
				GoalTitle = goals.FirstOrDefault(g => g.Id == c.GoalId)?.Title,
				UserId = c.UserId,
				TotalContributed = c.TotalContributed
			});

			return Ok(dtoList);
		}

		// GET: api/reports/savings-vs-spending?coupleId=1&start=2025-01-01&end=2025-01-31
		[HttpGet("savings-vs-spending")]
		public async Task<ActionResult<SavingsVsSpendingDto>> GetSavingsVsSpending(
			[FromQuery] int coupleId,
			[FromQuery] DateTime? start,  
			[FromQuery] DateTime? end)
		{
			var startDate = start ?? DateTime.UtcNow.AddDays(-30);
			var endDate = end ?? DateTime.UtcNow;

			var totalSavings = await _context.SavingsGoalContributions
				.Where(c => c.SavingsGoal.CoupleId == coupleId && c.Date >= startDate && c.Date <= endDate)
				.SumAsync(c => (decimal?)c.Amount) ?? 0;

			var totalSpending = await _context.Expenses
				.Where(e => e.User.CoupleId == coupleId && e.Date >= startDate && e.Date <= endDate)
				.SumAsync(e => (decimal?)e.Amount) ?? 0;

			var dto = new SavingsVsSpendingDto
			{
				TotalSavings = totalSavings,
				TotalSpending = totalSpending,
				SavingsRate = (totalSavings + totalSpending) == 0 ? 0 : totalSavings / (totalSavings + totalSpending)
			};

			return Ok(dto);
		}

	}
}
