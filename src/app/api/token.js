/** Decode JWT payload (no signature check — server is source of truth). */
const decodePayload = token => {
  if (!token || typeof token !== 'string') {
    return null;
  }
  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    return JSON.parse(global.atob(padded));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token, skewSeconds = 30) => {
  const payload = decodePayload(token);
  if (!payload?.exp) {
    return false;
  }
  return Date.now() >= (payload.exp - skewSeconds) * 1000;
};

export const isJwtAuthError = (status, message = '') => {
  if (status !== 401) {
    return false;
  }
  const text = String(message).toLowerCase();
  return (
    text.includes('jwt') ||
    text.includes('token') ||
    text.includes('expired') ||
    text.includes('unauthorized')
  );
};
