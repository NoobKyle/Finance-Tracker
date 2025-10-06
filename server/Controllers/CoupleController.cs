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
	public class CouplesController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public CouplesController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<CoupleReadDto>>> GetCouples()
		{
			var couples = await _context.Couples.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<CoupleReadDto>>(couples));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<CoupleReadDto>> GetCouple(int id)
		{
			var couple = await _context.Couples.FindAsync(id);
			if (couple == null) return NotFound();

			return Ok(_mapper.Map<CoupleReadDto>(couple));
		}

		[HttpPost]
		public async Task<ActionResult<CoupleReadDto>> CreateCouple(CoupleCreateDto coupleCreateDto)
		{
			var couple = _mapper.Map<Couple>(coupleCreateDto);
			_context.Couples.Add(couple);
			await _context.SaveChangesAsync();

			var coupleReadDto = _mapper.Map<CoupleReadDto>(couple);
			return CreatedAtAction(nameof(GetCouple), new { id = couple.Id }, coupleReadDto);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateCouple(int id, CoupleUpdateDto coupleUpdateDto)
		{
			var couple = await _context.Couples.FindAsync(id);
			if (couple == null) return NotFound();

			_mapper.Map(coupleUpdateDto, couple);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCouple(int id)
		{
			var couple = await _context.Couples.FindAsync(id);
			if (couple == null) return NotFound();

			_context.Couples.Remove(couple);
			await _context.SaveChangesAsync();

			return NoContent();
		}


		// GET api/couple/{coupleId}/users
		[HttpGet("{coupleId}/users")]
		public async Task<IActionResult> GetUsersByCoupleId(int coupleId)
		{
			
			var users = await _context.Users
				.Where(u => u.CoupleId == coupleId)
				.Select(u => new
				{
					u.Id,
					u.FullName,
					u.Email
				})
				.ToListAsync();

			if (!users.Any())
				return NotFound("No users found for this couple.");

			// Get all incomes for these users
			var userIds = users.Select(u => u.Id).ToList();
			var totalIncome = await _context.Incomes
				.Where(i => userIds.Contains(i.UserId))
				.SumAsync(i => i.Amount);

			
			var result = new
			{
				CoupleId = coupleId,
				Users = users.Select(u => new { u.FullName, u.Email }),
				TotalIncome = totalIncome
			};

			return Ok(result);
		}

	}
}
