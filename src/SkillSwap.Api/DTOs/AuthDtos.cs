using System.ComponentModel.DataAnnotations;

namespace SkillSwap.Api.DTOs;

public class RegisterRequestDto
{
    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string EmailAddress { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
}

public class LoginRequestDto
{
    [Required]
    [EmailAddress]
    public string EmailAddress { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDto
{
    public bool Success { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    public string? Error { get; set; }
}
