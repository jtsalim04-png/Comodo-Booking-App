import { apiRequest, parseCollection } from './client';
import { API_PATHS } from './paths';

/** Normalize API JSON to the shape used by TicketCard / TicketPass (web field names). */
export const normalizeTicket = ticket => {
  if (!ticket) {
    return ticket;
  }
  const event =
    ticket.event && typeof ticket.event === 'object' ? ticket.event : null;

  return {
    ...ticket,
    event,
    seatLabel: ticket.seatLabel || event?.seatType || 'General admission',
    holderName: ticket.holderName?.trim() || 'Guest',
    holderEmail: ticket.holderEmail || '',
    qrCodePath: ticket.qrCodePath || null,
  };
};

export async function fetchMyTickets(token) {
  const data = await apiRequest(API_PATHS.tickets, { token });
  return parseCollection(data).map(normalizeTicket);
}

export async function fetchTicketById(token, ticketId) {
  const data = await apiRequest(`${API_PATHS.tickets}/${ticketId}`, { token });
  return normalizeTicket(data);
}

export async function purchaseTicket(token, event) {
  const eventId = Number(event?.id);
  if (!Number.isFinite(eventId)) {
    const error = new Error(
      'Could not determine event id. Open the event from Order tickets and try again.',
    );
    error.status = 400;
    throw error;
  }

  const data = await apiRequest(API_PATHS.tickets, {
    token,
    method: 'POST',
    body: { eventId },
  });
  return normalizeTicket(data);
}
