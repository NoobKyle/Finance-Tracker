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

		[HttpGet]
		public async Task<ActionResult<IEnumerable<CommentReadDto>>> GetComments()
		{
			var comments = await _context.Comments.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<CommentReadDto>>(comments));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<CommentReadDto>> GetComment(int id)
		{
			var comment = await _context.Comments.FindAsync(id);
			if (comment == null) return NotFound();
			return Ok(_mapper.Map<CommentReadDto>(comment));
		}

		[HttpPost]
		public async Task<ActionResult<CommentReadDto>> CreateComment(CommentCreateDto dto)
		{
			var comment = _mapper.Map<Comment>(dto);
			_context.Comments.Add(comment);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, _mapper.Map<CommentReadDto>(comment));
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateComment(int id, CommentUpdateDto dto)
		{
			var comment = await _context.Comments.FindAsync(id);
			if (comment == null) return NotFound();
			_mapper.Map(dto, comment);
			await _context.SaveChangesAsync();
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteComment(int id)
		{
			var comment = await _context.Comments.FindAsync(id);
			if (comment == null) return NotFound();
			_context.Comments.Remove(comment);
			await _context.SaveChangesAsync();
			return NoContent();
		}
	}
}
