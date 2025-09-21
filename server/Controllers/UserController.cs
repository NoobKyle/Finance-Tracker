using AutoMapper;
using CoupleFinanceTracker.DTOs;
using CoupleFinanceTracker.Data;
using CoupleFinanceTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[ServiceFilter(typeof(LoggingActionFilter))]
	public class UsersController : BaseController 
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public UsersController(AppDbContext context, IMapper mapper, ILogger<UsersController> logger): base(logger)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<UserReadDto>>> GetUsers()
		{
			var users = await _context.Users.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<UserReadDto>>(users));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<UserReadDto>> GetUser(int id)
		{
			var user = await _context.Users.FindAsync(id);
			if (user == null) return NotFound();

			return Ok(_mapper.Map<UserReadDto>(user));
		}

		[HttpPost]
		public async Task<ActionResult<UserReadDto>> CreateUser(UserCreateDto userCreateDto)
		{
			var couple = await _context.Couples
				.FirstOrDefaultAsync(c => c.Id == userCreateDto.CoupleId);

			if (couple == null)
			{
				couple = new Couple
				{
					Id = userCreateDto.CoupleId,          
					CoupleCode = Guid.NewGuid().ToString(), 
					
				};

				_context.Couples.Add(couple);
				await _context.SaveChangesAsync();
			}

			var user = _mapper.Map<User>(userCreateDto);

			user.CoupleId = couple.Id;

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			var userReadDto = _mapper.Map<UserReadDto>(user);

			return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userReadDto);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateUser(int id, UserUpdateDto userUpdateDto)
		{
			var user = await _context.Users.FindAsync(id);
			if (user == null) return NotFound();

			_mapper.Map(userUpdateDto, user);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteUser(int id)
		{
			var user = await _context.Users.FindAsync(id);
			if (user == null) return NotFound();

			_context.Users.Remove(user);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		// GET /api/users/login?email=test@example.com&password=12345
		[HttpGet("login")]
		public async Task<ActionResult<int>> Login([FromQuery] string email, [FromQuery] string password)
		{
			var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
			if (user == null) return Unauthorized("Invalid credentials");

			if (user.PasswordHash != password) 
				return Unauthorized("Invalid credentials");

			return Ok(user.Id);
		}
	}
}
