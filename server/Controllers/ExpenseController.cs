using AutoMapper;
using CoupleFinanceTracker.DTOs;
using CoupleFinanceTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoupleFinanceTracker.Data;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ExpensesController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public ExpensesController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<ExpenseReadDto>>> GetExpenses()
		{
			var expenses = await _context.Expenses.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<ExpenseReadDto>>(expenses));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ExpenseReadDto>> GetExpense(int id)
		{
			var expense = await _context.Expenses.FindAsync(id);
			if (expense == null) return NotFound();

			return Ok(_mapper.Map<ExpenseReadDto>(expense));
		}

		[HttpPost]
		public async Task<ActionResult<ExpenseReadDto>> CreateExpense(ExpenseCreateDto expenseCreateDto)
		{
			var expense = _mapper.Map<Expense>(expenseCreateDto);
			_context.Expenses.Add(expense);
			await _context.SaveChangesAsync();

			var expenseReadDto = _mapper.Map<ExpenseReadDto>(expense);
			return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expenseReadDto);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateExpense(int id, ExpenseUpdateDto expenseUpdateDto)
		{
			var expense = await _context.Expenses.FindAsync(id);
			if (expense == null) return NotFound();

			_mapper.Map(expenseUpdateDto, expense);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteExpense(int id)
		{
			var expense = await _context.Expenses.FindAsync(id);
			if (expense == null) return NotFound();

			_context.Expenses.Remove(expense);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpGet("user/{userId}")]
		public async Task<ActionResult<IEnumerable<ExpenseReadDto>>> GetExpensesByUserId(int userId)
		{
			var expenses = await _context.Expenses
				.Where(e => e.UserId == userId)
				.ToListAsync();

			if (expenses == null || expenses.Count == 0)
				return NotFound($"No expenses found for user with id {userId}");

			return Ok(_mapper.Map<IEnumerable<ExpenseReadDto>>(expenses));
		}



		// GET: api/expenses/shared/{coupleId}
		[HttpGet("shared/{coupleId}")]
		public async Task<IActionResult> GetSharedExpensesByCoupleId(int coupleId)
		{
			var userIds = await _context.Users
				.Where(u => u.CoupleId == coupleId)
				.Select(u => u.Id) 
				.ToListAsync();

			if (!userIds.Any())
			{
				return NotFound(new { message = "No users found for this couple." });
			}

			var sharedExpenses = await _context.Expenses
				.Where(e => userIds.Contains(e.UserId) && e.IsShared == true)
				.ToListAsync();

			return Ok(sharedExpenses);
		}



		// GET: api/expenses/user/24
		[HttpGet("userexpense/{userId}")]
		public async Task<ActionResult<IEnumerable<Expense>>> GetUserExpenses(int userId)
		{
			var expenses = await _context.Expenses
				.Where(e => e.UserId == userId)
				.ToListAsync();

			if (expenses == null || expenses.Count == 0)
			{
				return NotFound(new { Message = "No expenses found for this user." });
			}

			return Ok(expenses);
		}
	}
}
