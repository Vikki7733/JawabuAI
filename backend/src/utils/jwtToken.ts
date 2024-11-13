


import jwt from 'jsonwebtoken';
import { generateSecretKey } from './generateSecretKey';

// In-memory storage for the current and previous JWT keys
let currentSecretKey = generateSecretKey(); // Initialize the first secret key
let previousSecretKey: string | null = null;

// Rotate secret key every 24 hours (or any interval you prefer)
setInterval(() => {
  previousSecretKey = currentSecretKey;
  currentSecretKey = generateSecretKey();
}, 24 * 60 * 60 * 1000); // Rotate every 24 hours

// Function to sign a JWT with the current secret key
export function generateJWT(payload: object): string {
  return jwt.sign(payload, currentSecretKey, { expiresIn: '1h' });
}

// Function to verify JWT with current or previous secret key
export function verifyJWT(token: string): any {
  try {
    return jwt.verify(token, currentSecretKey);
  } catch (error) {
    if (previousSecretKey) {
      try {
        return jwt.verify(token, previousSecretKey); // Try using the previous key
      } catch (error) {
        throw new Error('Token verification failed');
      }
    } else {
      throw new Error('Token verification failed');
    }
  }
}
