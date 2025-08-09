using AutoMapper;
using CoupleFinanceTracker.DTOs;
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
		private readonly IMapper _mapper;

		public UsersController(AppDbContext context, IMapper mapper)
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
			var user = _mapper.Map<User>(userCreateDto);
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
	}
}
