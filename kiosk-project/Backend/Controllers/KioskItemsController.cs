using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/students/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] StudentDto dto)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.SchoolId == dto.SchoolId);
            if (student == null)
            {
                return Unauthorized(new { message = "School ID not found. Please register." });
            }
            return Ok(student);
        }

        // POST: api/students/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] StudentDto dto)
        {
            var existing = await _context.Students.FirstOrDefaultAsync(s => s.SchoolId == dto.SchoolId);
            if (existing != null)
            {
                return BadRequest(new { message = "Student already registered. Please log in." });
            }

            var newStudent = new Student
            {
                SchoolId = dto.SchoolId,
                BirthDate = dto.BirthDate,
                WalletBalance = 15.00m,
                RewardPoints = 220
            };

            _context.Students.Add(newStudent);
            await _context.SaveChangesAsync();

            return Ok(newStudent);
        }
    }

    public class StudentDto
    {
        public string SchoolId { get; set; } = string.Empty;
        public string? BirthDate { get; set; }
    }
}