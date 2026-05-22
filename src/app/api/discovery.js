import { apiRequest } from './client';
import { API_PATHS } from './paths';

/**
 * Read API Platform entrypoint from the live server (same host as the website).
 * Used to confirm the server is reachable; ticket routes are not listed here
 * but are still available at API_PATHS.tickets when ApiTicketController is loaded.
 */
export async function fetchApiEntrypoint(token) {
  return apiRequest(API_PATHS.entrypoint, {
    token,
    accept: 'application/ld+json',
  });
}

/** Events are exposed via API Platform at entrypoint.event → /api/events */
export function getEventsCollectionPath(entrypoint) {
  const href = entrypoint?.event;
  if (typeof href === 'string' && href.startsWith('/api/')) {
    return href;
  }
  return API_PATHS.events;
}
