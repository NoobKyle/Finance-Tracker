using CoupleFinanceTracker.Data;
using CoupleFinanceTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UsersController : ControllerBase
	{
		private readonly AppDbContext _context;

		public UsersController(AppDbContext context)
		{
			_context = context;
		}

		// GET: api/users
		[HttpGet]
		public async Task<ActionResult<IEnumerable<User>>> GetUsers()
		{
			var users = await _context.Users.ToListAsync();
			return Ok(users);
		}

		// POST: api/users
		[HttpPost]
		public async Task<ActionResult<User>> CreateUser(User user)
		{
			_context.Users.Add(user);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
		}
	}
}
