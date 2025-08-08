using AutoMapper;
using CoupleFinanceTracker.DTOs;
using CoupleFinanceTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using CoupleFinanceTracker.Data;
using System.Threading.Tasks;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class SavingsGoalsController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public SavingsGoalsController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<SavingsGoalReadDto>>> GetSavingsGoals()
		{
			var goals = await _context.SavingsGoals.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<SavingsGoalReadDto>>(goals));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<SavingsGoalReadDto>> GetSavingsGoal(int id)
		{
			var goal = await _context.SavingsGoals.FindAsync(id);
			if (goal == null) return NotFound();

			return Ok(_mapper.Map<SavingsGoalReadDto>(goal));
		}

		[HttpPost]
		public async Task<ActionResult<SavingsGoalReadDto>> CreateSavingsGoal(SavingsGoalCreateDto dto)
		{
			var goal = _mapper.Map<SavingsGoal>(dto);
			_context.SavingsGoals.Add(goal);
			await _context.SaveChangesAsync();

			var readDto = _mapper.Map<SavingsGoalReadDto>(goal);
			return CreatedAtAction(nameof(GetSavingsGoal), new { id = goal.Id }, readDto);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateSavingsGoal(int id, SavingsGoalUpdateDto dto)
		{
			var goal = await _context.SavingsGoals.FindAsync(id);
			if (goal == null) return NotFound();

			_mapper.Map(dto, goal);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSavingsGoal(int id)
		{
			var goal = await _context.SavingsGoals.FindAsync(id);
			if (goal == null) return NotFound();

			_context.SavingsGoals.Remove(goal);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
