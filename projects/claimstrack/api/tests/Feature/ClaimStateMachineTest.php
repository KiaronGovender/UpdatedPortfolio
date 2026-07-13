<?php

use App\Models\Claim;
use App\Services\ClaimStateMachine;

test('submitted can transition to under_review', function () {
    expect(ClaimStateMachine::canTransition('submitted', 'under_review'))->toBeTrue();
});

test('submitted cannot transition to approved', function () {
    expect(ClaimStateMachine::canTransition('submitted', 'approved'))->toBeFalse();
});

test('transition creates audit log entry', function () {
    $claim = Claim::factory()->create(['status' => 'submitted']);

    ClaimStateMachine::transition($claim, 'under_review', 'adjuster-01', 'Assigned');

    expect($claim->fresh()->status)->toBe('under_review');
    expect($claim->auditLogs)->toHaveCount(1);
});

test('invalid transition throws exception', function () {
    $claim = Claim::factory()->create(['status' => 'submitted']);

    ClaimStateMachine::transition($claim, 'settled', 'admin-01');
})->throws(InvalidArgumentException::class);
