using ClaimsTrack.Models;

namespace ClaimsTrack.Services;

public static class ClaimStateMachine
{
    private static readonly Dictionary<ClaimStatus, HashSet<ClaimStatus>> AllowedTransitions = new()
    {
        [ClaimStatus.Submitted] = [ClaimStatus.UnderReview],
        [ClaimStatus.UnderReview] = [ClaimStatus.Approved, ClaimStatus.Denied],
        [ClaimStatus.Approved] = [ClaimStatus.Settled],
        [ClaimStatus.Denied] = [],
        [ClaimStatus.Settled] = [],
    };

    public static bool CanTransition(ClaimStatus from, ClaimStatus to) =>
        AllowedTransitions.TryGetValue(from, out var allowed) && allowed.Contains(to);

    public static Claim Transition(Claim claim, TransitionRequest request)
    {
        if (!CanTransition(claim.Status, request.TargetStatus))
            throw new InvalidOperationException(
                $"Invalid transition from {claim.Status} to {request.TargetStatus}");

        var audit = new ClaimAuditEntry(
            claim.Status,
            request.TargetStatus,
            request.ActorId,
            DateTime.UtcNow,
            request.Note
        );

        return claim with
        {
            Status = request.TargetStatus,
            AuditLog = [.. claim.AuditLog, audit],
        };
    }
}

public class ClaimRepository
{
    private readonly List<Claim> _claims = [];

    public Claim Create(CreateClaimRequest request)
    {
        var claim = new Claim(
            Id: $"CLM-{Guid.NewGuid():N}"[..12].ToUpper(),
            PolicyholderId: request.PolicyholderId,
            Type: request.Type,
            Status: ClaimStatus.Submitted,
            Amount: request.Amount,
            Description: request.Description,
            CreatedAt: DateTime.UtcNow,
            AuditLog: []
        );
        _claims.Add(claim);
        return claim;
    }

    public IEnumerable<Claim> GetAll() => _claims;
    public Claim? GetById(string id) => _claims.FirstOrDefault(c => c.Id == id);

    public Claim Update(Claim claim)
    {
        var index = _claims.FindIndex(c => c.Id == claim.Id);
        if (index >= 0) _claims[index] = claim;
        return claim;
    }
}
