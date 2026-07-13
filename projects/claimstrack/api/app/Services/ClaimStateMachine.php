<?php

namespace App\Services;

use App\Models\Claim;
use App\Models\ClaimAuditLog;
use InvalidArgumentException;

enum ClaimStatus: string
{
    case Submitted = 'submitted';
    case UnderReview = 'under_review';
    case Approved = 'approved';
    case Denied = 'denied';
    case Settled = 'settled';
}

class ClaimStateMachine
{
    private const TRANSITIONS = [
        'submitted' => ['under_review'],
        'under_review' => ['approved', 'denied'],
        'approved' => ['settled'],
        'denied' => [],
        'settled' => [],
    ];

    public static function canTransition(string $from, string $to): bool
    {
        return in_array($to, self::TRANSITIONS[$from] ?? [], true);
    }

    public static function transition(Claim $claim, string $targetStatus, string $actorId, ?string $note = null): Claim
    {
        if (!self::canTransition($claim->status, $targetStatus)) {
            throw new InvalidArgumentException(
                "Invalid transition from {$claim->status} to {$targetStatus}"
            );
        }

        ClaimAuditLog::create([
            'claim_id' => $claim->id,
            'from_status' => $claim->status,
            'to_status' => $targetStatus,
            'actor_id' => $actorId,
            'note' => $note,
        ]);

        $claim->update(['status' => $targetStatus]);

        return $claim->fresh();
    }
}
