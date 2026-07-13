<?php

namespace App\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class DocumentEncryptionService
{
    public function encrypt(string $plaintext): array
    {
        $encrypted = Crypt::encryptString($plaintext);

        return [
            'ciphertext' => $encrypted,
            'key_version' => config('app.key_version', 1),
        ];
    }

    public function decrypt(string $ciphertext): string
    {
        try {
            return Crypt::decryptString($ciphertext);
        } catch (DecryptException $e) {
            throw new \RuntimeException('Failed to decrypt document — key may have rotated.');
        }
    }
}
