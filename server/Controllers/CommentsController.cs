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
	public class CommentsController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public CommentsController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		// GET: api/comments
		[HttpGet]
		public async Task<ActionResult<IEnumerable<CommentReadDto>>> GetComments()
		{
			var comments = await _context.Comments.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<CommentReadDto>>(comments));
		}

		// GET: api/comments/{id}
		[HttpGet("{id}")]
		public async Task<ActionResult<CommentReadDto>> GetComment(int id)
		{
			var comment = await _context.Comments.FindAsync(id);
			if (comment == null) return NotFound();

			return Ok(_mapper.Map<CommentReadDto>(comment));
		}

		// GET: api/comments/byUser/{userId}
		[HttpGet("byUser/{userId}")]
		public async Task<ActionResult<IEnumerable<CommentReadDto>>> GetCommentsByUser(int userId)
		{
			var comments = await _context.Comments
				.Where(c => c.UserId == userId)
				.ToListAsync();

			return Ok(_mapper.Map<IEnumerable<CommentReadDto>>(comments));
		}



		// POST: api/comments
		[HttpPost]
		public async Task<ActionResult<CommentReadDto>> CreateComment(CommentCreateDto dto)
		{
			var comment = _mapper.Map<Comment>(dto);
			comment.CreatedAt = DateTime.UtcNow;

			_context.Comments.Add(comment);
			await _context.SaveChangesAsync();

			var readDto = _mapper.Map<CommentReadDto>(comment);
			return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, readDto);
		}

		// PUT: api/comments/{id}
		[HttpPut("{id}")]
		public async Task<ActionResult<CommentReadDto>> UpdateComment(int id, CommentUpdateDto dto)
		{
			var comment = await _context.Comments.FindAsync(id);
			if (comment == null) return NotFound();

			_mapper.Map(dto, comment);
			await _context.SaveChangesAsync();

			return Ok(_mapper.Map<CommentReadDto>(comment));
		}

		// DELETE: api/comments/{id}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteComment(int id)
		{
			var comment = await _context.Comments.FindAsync(id);
			if (comment == null) return NotFound();

			_context.Comments.Remove(comment);
			await _context.SaveChangesAsync();

			return NoContent();
		}


		// GET: api/comments/byCouple/{coupleId}
		[HttpGet("byCouple/{coupleId}")]
		public async Task<ActionResult<IEnumerable<object>>> GetCommentsByCouple(int coupleId)
		{
			var comments = await _context.Comments
				.Include(c => c.User) // make sure we bring in user details
				.Where(c => c.User.CoupleId == coupleId)
				.OrderByDescending(c => c.CreatedAt)
				.Select(c => new
				{
					c.Id,
					c.Text,
					c.CreatedAt,
					UserId = c.UserId,
					UserName = c.User.FullName, // assumes you have a "FullName" property on User
				
				})
				.ToListAsync();

			return Ok(comments);
		}
	}
}
