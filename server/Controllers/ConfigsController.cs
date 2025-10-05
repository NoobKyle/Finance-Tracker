using AutoMapper;
using CoupleFinanceTracker.Data;
using CoupleFinanceTracker.DTOs;
using CoupleFinanceTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoupleFinanceTracker.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ConfigsController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly IMapper _mapper;

		public ConfigsController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		// GET: api/configs
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ConfigReadDto>>> GetConfigs([FromQuery] string? category)
		{
			IQueryable<Config> query = _context.Configs;

			if (!string.IsNullOrWhiteSpace(category))
			{
				query = query.Where(c => c.Category == category);
			}

			var configs = await query.ToListAsync();
			return Ok(_mapper.Map<IEnumerable<ConfigReadDto>>(configs));
		}


		// GET: api/configs/{category}
		[HttpGet("/api/configs/{category}")]
		public async Task<ActionResult<IEnumerable<ConfigReadDto>>> GetConfigsByCategory(string category)
		{
			
			var configs = await _context.Configs
										.Where(c => c.Category == category)
										.ToListAsync();

			if (!configs.Any()) return NotFound($"No configs found for category '{category}'.");

			return Ok(_mapper.Map<IEnumerable<ConfigReadDto>>(configs));
		}

	}
}
