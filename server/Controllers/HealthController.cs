using CoupleFinanceTracker.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class HealthController : ControllerBase
	{
		private readonly AppDbContext _context;

		public HealthController(AppDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetHealth()
		{
			try
			{
				// Run a simple query to check DB connectivity
				await _context.Database.ExecuteSqlRawAsync("SELECT 1");

				return Ok("OK"); // DB connection works
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Database connection failed: {ex.Message}");
			}
		}
	}
}
