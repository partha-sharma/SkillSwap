using System.ComponentModel.DataAnnotations;
using SkillSwap.Api.Models.Enums;

namespace SkillSwap.Api.Models;

public class ExchangeRequest
{
    public int RequestId { get; set; }

    public int SenderId { get; set; }

    public int ReceiverId { get; set; }

    public ExchangeRequestStatus Status { get; set; } = ExchangeRequestStatus.Pending;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // ── Navigation properties ──────────────────────────────────────
    public User Sender { get; set; } = null!;
    public User Receiver { get; set; } = null!;
    public ICollection<Session> Sessions { get; set; } = new List<Session>();
}
