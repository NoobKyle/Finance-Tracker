using Microsoft.EntityFrameworkCore;
using CoupleFinanceTracker.Data;

var builder = WebApplication.CreateBuilder(args);

// Allow CORS for frontend
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontend", policy =>
	{
		policy
			.WithOrigins(
				"http://localhost:5173", // Vite default
				"https://couplefinancetracker.vercel.app/" // Production frontend
			)
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});


// Get connection string from Railway's environment variable if available
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

if (!string.IsNullOrEmpty(databaseUrl))
{
	// Convert to Npgsql connection string
	var uri = new Uri(databaseUrl);
	var userInfo = uri.UserInfo.Split(':');

	var connectionString =
		$"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";

	builder.Services.AddDbContext<AppDbContext>(options =>
		options.UseNpgsql(connectionString));
}
else
{
	// Fallback to local connection string
	builder.Services.AddDbContext<AppDbContext>(options =>
		options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
}

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();

