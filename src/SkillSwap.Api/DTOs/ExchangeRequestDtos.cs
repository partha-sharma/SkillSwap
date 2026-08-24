using System.ComponentModel.DataAnnotations;
using SkillSwap.Api.Models.Enums;

namespace SkillSwap.Api.DTOs;

public class ExchangeRequestDto
{
    public int RequestId { get; set; }
    public int SenderId { get; set; }
    public int ReceiverId { get; set; }
    public string LearningGoals { get; set; } = string.Empty;
    public string EstimatedDuration { get; set; } = string.Empty;
    public ExchangeRequestStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateExchangeRequestDto
{
    [Required]
    public int ReceiverId { get; set; }

    [Required]
    public string LearningGoals { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string EstimatedDuration { get; set; } = string.Empty;
}

public class UpdateExchangeRequestStatusDto
{
    [Required]
    public ExchangeRequestStatus Status { get; set; }
}
