using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillSwap.Api.DTOs;
using SkillSwap.Api.Extensions;
using SkillSwap.Api.Models;
using SkillSwap.Api.Models.Enums;
using SkillSwap.Api.Repositories;

namespace SkillSwap.Api.Controllers;

[ApiController]
[Route("api/exchange-requests")]
[Authorize]
public class ExchangeRequestController : ControllerBase
{
    private readonly IRepository<ExchangeRequest> _exchangeRequestRepository;
    private readonly IRepository<User> _userRepository;

    public ExchangeRequestController(
        IRepository<ExchangeRequest> exchangeRequestRepository,
        IRepository<User> userRepository)
    {
        _exchangeRequestRepository = exchangeRequestRepository;
        _userRepository = userRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateExchangeRequest([FromBody] CreateExchangeRequestDto request)
    {
        var senderId = User.GetUserId();

        if (senderId == request.ReceiverId)
            return BadRequest(new { error = "You cannot send an exchange request to yourself." });

        var receiver = await _userRepository.GetByIdAsync(request.ReceiverId);
        if (receiver == null)
            return NotFound(new { error = "Receiver not found." });

        var newRequest = new ExchangeRequest
        {
            SenderId = senderId,
            ReceiverId = request.ReceiverId,
            LearningGoals = request.LearningGoals,
            EstimatedDuration = request.EstimatedDuration,
            Status = ExchangeRequestStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        await _exchangeRequestRepository.AddAsync(newRequest);
        // AddAsync already calls SaveChangesAsync

        return Ok(new
        {
            success = true,
            data = MapToDto(newRequest)
        });
    }

    [HttpGet("sent")]
    public async Task<IActionResult> GetSentRequests()
    {
        var senderId = User.GetUserId();
        var requests = await _exchangeRequestRepository.FindAsync(er => er.SenderId == senderId);

        var data = requests.Select(MapToDto).ToList();

        return Ok(new { success = true, data });
    }

    [HttpGet("received")]
    public async Task<IActionResult> GetReceivedRequests()
    {
        var receiverId = User.GetUserId();
        var requests = await _exchangeRequestRepository.FindAsync(er => er.ReceiverId == receiverId);

        var data = requests.Select(MapToDto).ToList();

        return Ok(new { success = true, data });
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateRequestStatus(int id, [FromBody] UpdateExchangeRequestStatusDto requestDto)
    {
        var userId = User.GetUserId();
        var exchangeRequest = await _exchangeRequestRepository.GetByIdAsync(id);

        if (exchangeRequest == null)
            return NotFound(new { error = "Exchange request not found." });

        try
        {
            exchangeRequest.TransitionTo(requestDto.Status, userId);
            await _exchangeRequestRepository.UpdateAsync(exchangeRequest);

            return Ok(new
            {
                success = true,
                data = MapToDto(exchangeRequest)
            });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    private static ExchangeRequestDto MapToDto(ExchangeRequest er)
    {
        return new ExchangeRequestDto
        {
            RequestId = er.RequestId,
            SenderId = er.SenderId,
            ReceiverId = er.ReceiverId,
            LearningGoals = er.LearningGoals,
            EstimatedDuration = er.EstimatedDuration,
            Status = er.Status,
            CreatedAt = er.CreatedAt
        };
    }
}
