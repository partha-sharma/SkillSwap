using System.ComponentModel.DataAnnotations;

namespace SkillSwap.Api.Models;

public class Bootcamp
{
    public int BootcampId { get; set; }

    public int OrganizerId { get; set; }

    [Required]
    [MaxLength(200)]
    public string TopicTitle { get; set; } = string.Empty;

    public DateTime ScheduledTime { get; set; }

    public int MaxParticipantCap { get; set; }

    // ── Navigation properties ──────────────────────────────────────
    public User Organizer { get; set; } = null!;
    public ICollection<BootcampEnrollment> Enrollments { get; set; } = new List<BootcampEnrollment>();
}
