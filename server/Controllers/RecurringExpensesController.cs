using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoupleFinanceTracker.Data;
using CoupleFinanceTracker.DTOs;
using CoupleFinanceTracker.Models;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RecurringExpensesController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public RecurringExpensesController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<RecurringExpenseReadDto>>> GetRecurringExpenses()
		{
			var expenses = await _context.RecurringExpenses.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<RecurringExpenseReadDto>>(expenses));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<RecurringExpenseReadDto>> GetRecurringExpense(int id)
		{
			var expense = await _context.RecurringExpenses.FindAsync(id);
			if (expense == null) return NotFound();
			return Ok(_mapper.Map<RecurringExpenseReadDto>(expense));
		}

		[HttpPost]
		public async Task<ActionResult<RecurringExpenseReadDto>> CreateRecurringExpense(RecurringExpenseCreateDto dto)
		{
			var expense = _mapper.Map<RecurringExpense>(dto);
			_context.RecurringExpenses.Add(expense);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetRecurringExpense), new { id = expense.Id }, _mapper.Map<RecurringExpenseReadDto>(expense));
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateRecurringExpense(int id, RecurringExpenseUpdateDto dto)
		{
			var expense = await _context.RecurringExpenses.FindAsync(id);
			if (expense == null) return NotFound();
			_mapper.Map(dto, expense);
			await _context.SaveChangesAsync();
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteRecurringExpense(int id)
		{
			var expense = await _context.RecurringExpenses.FindAsync(id);
			if (expense == null) return NotFound();
			_context.RecurringExpenses.Remove(expense);
			await _context.SaveChangesAsync();
			return NoContent();
		}
	}
}
