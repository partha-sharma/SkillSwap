using Microsoft.AspNetCore.Mvc;
using SkillSwap.Api.DTOs;
using SkillSwap.Api.Models;
using SkillSwap.Api.Repositories;
using SkillSwap.Api.Services.Auth;

namespace SkillSwap.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IRepository<User> _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;

    public AuthController(
        IRepository<User> userRepository,
        IPasswordHasher passwordHasher,
        ITokenService tokenService)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        var existingUsers = await _userRepository.FindAsync(u => u.EmailAddress == request.EmailAddress);
        var existingUser = existingUsers.FirstOrDefault();
        if (existingUser != null)
        {
            return BadRequest(new AuthResponseDto { Success = false, Error = "Email already in use." });
        }

        var newUser = new User
        {
            FullName = request.FullName,
            EmailAddress = request.EmailAddress,
            PasswordHash = _passwordHasher.HashPassword(request.Password),
            RefreshToken = Guid.NewGuid().ToString(),
            RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
        };

        await _userRepository.AddAsync(newUser);
        // AddAsync already calls SaveChangesAsync

        var token = _tokenService.GenerateToken(newUser);

        return Ok(new AuthResponseDto
        {
            Success = true,
            Token = token,
            RefreshToken = newUser.RefreshToken
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        var users = await _userRepository.FindAsync(u => u.EmailAddress == request.EmailAddress);
        var user = users.FirstOrDefault();
        if (user == null || !_passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized(new AuthResponseDto { Success = false, Error = "Invalid email or password." });
        }

        // Generate a new refresh token on login
        user.RefreshToken = Guid.NewGuid().ToString();
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _userRepository.UpdateAsync(user);

        var token = _tokenService.GenerateToken(user);

        return Ok(new AuthResponseDto
        {
            Success = true,
            Token = token,
            RefreshToken = user.RefreshToken
        });
    }
}
