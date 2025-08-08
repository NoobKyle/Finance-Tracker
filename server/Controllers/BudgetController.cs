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
	public class BudgetsController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public BudgetsController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<BudgetReadDto>>> GetBudgets()
		{
			var budgets = await _context.Budgets.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<BudgetReadDto>>(budgets));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<BudgetReadDto>> GetBudget(int id)
		{
			var budget = await _context.Budgets.FindAsync(id);
			if (budget == null) return NotFound();

			return Ok(_mapper.Map<BudgetReadDto>(budget));
		}

		[HttpPost]
		public async Task<ActionResult<BudgetReadDto>> CreateBudget(BudgetCreateDto budgetCreateDto)
		{
			var budget = _mapper.Map<Budget>(budgetCreateDto);
			_context.Budgets.Add(budget);
			await _context.SaveChangesAsync();

			var budgetReadDto = _mapper.Map<BudgetReadDto>(budget);
			return CreatedAtAction(nameof(GetBudget), new { id = budget.Id }, budgetReadDto);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateBudget(int id, BudgetUpdateDto budgetUpdateDto)
		{
			var budget = await _context.Budgets.FindAsync(id);
			if (budget == null) return NotFound();

			_mapper.Map(budgetUpdateDto, budget);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteBudget(int id)
		{
			var budget = await _context.Budgets.FindAsync(id);
			if (budget == null) return NotFound();

			_context.Budgets.Remove(budget);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
