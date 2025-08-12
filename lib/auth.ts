import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_NAME = 'auth-token';
const TOKEN_DURATION = 60 * 60 * 24 * 7; // 7 days

export interface JwtPayload {
  id: string;
  email: string;
  roles: string[];
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_DURATION });
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get the auth token from cookies
 */
export function getAuthToken(request: NextRequest): string | undefined {
  return request.cookies.get(TOKEN_NAME)?.value;
}

/**
 * Set the auth token as a cookie
 * Note: This function should be used in API routes, not server components
 */
export async function setAuthCookie(payload: JwtPayload): Promise<void> {
  const token = generateToken(payload);
  (await cookies()).set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_DURATION,
    path: '/',
    sameSite: 'strict',
  });
}

/**
 * Clear the auth token cookie
 * Note: This function should be used in API routes, not server components
 */
export async function clearAuthCookie(): Promise<void> {
  (await cookies()).set(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
    sameSite: 'strict',
  });
}