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
	public class IncomesController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public IncomesController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<IncomeReadDto>>> GetIncomes()
		{
			var incomes = await _context.Incomes.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<IncomeReadDto>>(incomes));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<IncomeReadDto>> GetIncome(int id)
		{
			var income = await _context.Incomes.FindAsync(id);
			if (income == null) return NotFound();
			return Ok(_mapper.Map<IncomeReadDto>(income));
		}

		[HttpPost]
		public async Task<ActionResult<IncomeReadDto>> CreateIncome(IncomeCreateDto dto)
		{
			var income = _mapper.Map<Income>(dto);
			_context.Incomes.Add(income);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetIncome), new { id = income.Id }, _mapper.Map<IncomeReadDto>(income));
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateIncome(int id, IncomeUpdateDto dto)
		{
			var income = await _context.Incomes.FindAsync(id);
			if (income == null) return NotFound();
			_mapper.Map(dto, income);
			await _context.SaveChangesAsync();
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteIncome(int id)
		{
			var income = await _context.Incomes.FindAsync(id);
			if (income == null) return NotFound();
			_context.Incomes.Remove(income);
			await _context.SaveChangesAsync();
			return NoContent();
		}
	}
}
