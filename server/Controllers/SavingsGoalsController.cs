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

		// GET: /SavingsGoals/byCouple/{coupleId}
		[HttpGet("byCouple/{coupleId}")]
		public async Task<ActionResult<IEnumerable<SavingsGoalReadDto>>> GetByCouple(int coupleId)
		{
			var goals = await _context.SavingsGoals
				.Where(g => g.CoupleId == coupleId)
				.ToListAsync();

			return goals.Select(g => new SavingsGoalReadDto
			{
				Id = g.Id,
				Title = g.Title,
				TargetAmount = g.TargetAmount,
				CurrentAmount = g.CurrentAmount
			}).ToList();
		}



		// POST: /SavingsGoals/{id}/contributions
		[HttpPost("{id}/contributions")]
		public async Task<ActionResult<SavingsGoalReadDto>> AddContribution(int id, [FromBody] ContributionDto dto)
		{
			var goal = await _context.SavingsGoals.FindAsync(id);
			if (goal == null) return NotFound("Savings goal not found.");

			var user = await _context.Users.FindAsync(dto.UserId);
			if (user == null) return NotFound($"User {dto.UserId} not found.");

			var contribution = new SavingsGoalContribution
			{
				SavingsGoalId = id,
				UserId = dto.UserId, 
				Amount = dto.Amount,
				Date = DateTime.UtcNow
			};

			goal.CurrentAmount += dto.Amount;

			_context.SavingsGoalContributions.Add(contribution);

			await _context.SaveChangesAsync();

			return new SavingsGoalReadDto
			{
				Id = goal.Id,
				Title = goal.Title,
				TargetAmount = goal.TargetAmount,
				CurrentAmount = goal.CurrentAmount
			};
		}
	}

	public class ContributionDto
	{
		public decimal Amount { get; set; }
		public int UserId { get; set; }
	}
}
