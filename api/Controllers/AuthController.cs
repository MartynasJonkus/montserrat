using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Dtos.Auth;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmployeeRepository _employeeRepository;

        public AuthController(IConfiguration configuration, IEmployeeRepository employeeRepository)
        {
            _configuration = configuration;
            _employeeRepository = employeeRepository;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var employee = await _employeeRepository.GetEmployeeByUsernameAsync(loginDto.Username);

            if (employee == null || employee.Password != loginDto.Password)
                return Unauthorized("Invalid username or password.");

            var token = GenerateJwtToken(employee);

            var expiresInMinutes = _configuration["Jwt:ExpiresInMinutes"];
            if (string.IsNullOrEmpty(expiresInMinutes)) throw new InvalidOperationException("JWT ExpiresInMinutes is not configured. Please set Jwt:ExpiresInMinutes in appsettings.json.");
            return Ok(new TokenResponseDto
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddMinutes(int.Parse(expiresInMinutes))
            });
        }

        private string GenerateJwtToken(Employee employee)
        {
            var jwtKey = _configuration["Jwt:Key"];
            var expiresInMinutes = _configuration["Jwt:ExpiresInMinutes"];
            if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(expiresInMinutes))
                throw new InvalidOperationException("JWT settings not configured. Please configure settings in appsettings.json.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, employee.Username),
                new Claim("UserId", employee.Id.ToString()),
                new Claim("MerchantId", employee.MerchantId.ToString()),
                new Claim("EmployeeType", employee.EmployeeType.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(expiresInMinutes)),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}