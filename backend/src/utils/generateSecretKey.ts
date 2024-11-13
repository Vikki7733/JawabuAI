import crypto from 'crypto';

export function generateSecretKey(): string {
  return crypto.randomBytes(64).toString('hex'); // Generate a random 64-byte string as the secret key
}