namespace ClaimsTrack.Models;

public enum ClaimStatus
{
    Submitted,
    UnderReview,
    Approved,
    Denied,
    Settled
}

public enum ClaimType
{
    Motor,
    Home
}

public record Claim(
    string Id,
    string PolicyholderId,
    ClaimType Type,
    ClaimStatus Status,
    decimal Amount,
    string Description,
    DateTime CreatedAt,
    List<ClaimAuditEntry> AuditLog
);

public record ClaimAuditEntry(
    ClaimStatus FromStatus,
    ClaimStatus ToStatus,
    string ActorId,
    DateTime Timestamp,
    string? Note
);

public record CreateClaimRequest(
    string PolicyholderId,
    ClaimType Type,
    decimal Amount,
    string Description
);

public record TransitionRequest(
    ClaimStatus TargetStatus,
    string ActorId,
    string? Note
);
