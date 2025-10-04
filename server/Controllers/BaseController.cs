using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.Json;

namespace CoupleFinanceTracker.Controllers
{
	
	[ApiController]
	public abstract class BaseController : ControllerBase
	{
		protected readonly ILogger _logger;

		protected BaseController(ILogger logger)
		{
			_logger = logger;
		}

		
		protected ActionResult HandleNotFound(string entityName)
		{
			_logger.LogWarning("{Entity} not found", entityName);
			return NotFound($"{entityName} not found");
		}
	}

	public class LoggingActionFilter : ActionFilterAttribute
	{
		private readonly ILogger<LoggingActionFilter> _logger;
		private Stopwatch _stopwatch;

		public LoggingActionFilter(ILogger<LoggingActionFilter> logger)
		{
			_logger = logger;
		}

		public override void OnActionExecuting(ActionExecutingContext context)
		{
			_stopwatch = Stopwatch.StartNew();

			var controller = context.Controller.GetType().Name;
			var action = context.ActionDescriptor.DisplayName;

			_logger.LogInformation("Executing {Controller}.{Action} with arguments: {@Arguments}",
				controller, action, context.ActionArguments);

			if (context.HttpContext.Request.ContentLength > 0 &&
				context.HttpContext.Request.Body.CanSeek)
			{
				context.HttpContext.Request.Body.Position = 0;
				using var reader = new StreamReader(context.HttpContext.Request.Body, Encoding.UTF8, leaveOpen: true);
				var body = reader.ReadToEnd();
				context.HttpContext.Request.Body.Position = 0;

				if (!string.IsNullOrWhiteSpace(body))
					_logger.LogInformation("Request body: {Body}", body);
			}
		}

		public override void OnActionExecuted(ActionExecutedContext context)
		{
			_stopwatch.Stop();

			var controller = context.Controller.GetType().Name;
			var action = context.ActionDescriptor.DisplayName;

			if (context.Exception != null)
			{
				_logger.LogError(context.Exception, "Exception in {Controller}.{Action}", controller, action);
			}
			else
			{
				if (context.Result is ObjectResult objectResult)
				{
					var responseJson = JsonSerializer.Serialize(objectResult.Value);
					_logger.LogInformation("Response from {Controller}.{Action}: {Response}",
						controller, action, responseJson);
				}

				_logger.LogInformation("Executed {Controller}.{Action} in {ElapsedMilliseconds} ms",
					controller, action, _stopwatch.ElapsedMilliseconds);
			}
		}
	}
}
