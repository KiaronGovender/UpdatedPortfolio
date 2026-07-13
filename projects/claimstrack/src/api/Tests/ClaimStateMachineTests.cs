using ClaimsTrack.Models;
using ClaimsTrack.Services;
using Xunit;

namespace ClaimsTrack.Tests;

public class ClaimStateMachineTests
{
    private static Claim SampleClaim(ClaimStatus status) => new(
        "CLM-TEST", "PH-001", ClaimType.Motor, status,
        15000m, "Rear-end collision", DateTime.UtcNow, []
    );

    [Fact]
    public void Submitted_CanTransitionTo_UnderReview()
    {
        Assert.True(ClaimStateMachine.CanTransition(ClaimStatus.Submitted, ClaimStatus.UnderReview));
    }

    [Fact]
    public void Submitted_CannotTransitionTo_Approved()
    {
        Assert.False(ClaimStateMachine.CanTransition(ClaimStatus.Submitted, ClaimStatus.Approved));
    }

    [Fact]
    public void Transition_AddsAuditEntry()
    {
        var claim = SampleClaim(ClaimStatus.Submitted);
        var result = ClaimStateMachine.Transition(claim, new TransitionRequest(
            ClaimStatus.UnderReview, "adjuster-01", "Assigned for review"
        ));

        Assert.Equal(ClaimStatus.UnderReview, result.Status);
        Assert.Single(result.AuditLog);
        Assert.Equal("adjuster-01", result.AuditLog[0].ActorId);
    }

    [Fact]
    public void InvalidTransition_ThrowsException()
    {
        var claim = SampleClaim(ClaimStatus.Submitted);
        Assert.Throws<InvalidOperationException>(() =>
            ClaimStateMachine.Transition(claim, new TransitionRequest(
                ClaimStatus.Settled, "admin-01", null
            ))
        );
    }
}
