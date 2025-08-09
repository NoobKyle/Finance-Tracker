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
	public class ReceiptsController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public ReceiptsController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<ReceiptReadDto>>> GetReceipts()
		{
			var receipts = await _context.Receipts.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<ReceiptReadDto>>(receipts));
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ReceiptReadDto>> GetReceipt(int id)
		{
			var receipt = await _context.Receipts.FindAsync(id);
			if (receipt == null) return NotFound();
			return Ok(_mapper.Map<ReceiptReadDto>(receipt));
		}

		[HttpPost]
		public async Task<ActionResult<ReceiptReadDto>> CreateReceipt(ReceiptCreateDto dto)
		{
			var receipt = _mapper.Map<Receipt>(dto);
			_context.Receipts.Add(receipt);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetReceipt), new { id = receipt.Id }, _mapper.Map<ReceiptReadDto>(receipt));
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteReceipt(int id)
		{
			var receipt = await _context.Receipts.FindAsync(id);
			if (receipt == null) return NotFound();
			_context.Receipts.Remove(receipt);
			await _context.SaveChangesAsync();
			return NoContent();
		}
	}
}
