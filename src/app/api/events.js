import { apiRequest, parseCollection } from './client';
import { API_PATHS } from './paths';

/** Map API Platform / Symfony JSON to the shape used in screens (web field names). */
export const normalizeEvent = raw => {
  if (!raw || typeof raw !== 'object') {
    return raw;
  }

  const eventDate = raw.eventDate ?? raw.event_date;
  let dateValue = null;
  if (typeof eventDate === 'string') {
    dateValue = eventDate;
  } else if (eventDate) {
    dateValue = new Date(eventDate).toISOString();
  }

  let id = raw.id;
  if (id == null && raw['@id']) {
    const parts = String(raw['@id']).split('/');
    id = Number(parts[parts.length - 1]) || parts[parts.length - 1];
  }

  const organizer =
    raw.organizer && typeof raw.organizer === 'object' ? raw.organizer : null;

  return {
    ...raw,
    id,
    eventDate: dateValue,
    organizer,
    price: raw.price != null ? Number(raw.price) : 0,
    seatType: raw.seatType ?? raw.seat_type ?? null,
  };
};

/** Same ordering as web Order Tickets (`findBy([], ['eventDate' => 'ASC'])`). */
export const sortEventsByDate = events =>
  [...events].sort(
    (a, b) =>
      new Date(a.eventDate || 0).getTime() - new Date(b.eventDate || 0).getTime(),
  );

/** Same filter as web dashboard (`EventRepository::findUpcoming`). */
export const filterUpcomingEvents = (events, limit) => {
  const now = Date.now();
  const upcoming = events.filter(event => {
    if (!event?.eventDate) {
      return true;
    }
    return new Date(event.eventDate).getTime() >= now;
  });
  const sorted = sortEventsByDate(upcoming);
  return limit != null ? sorted.slice(0, limit) : sorted;
};

export async function fetchEvents(token) {
  const data = await apiRequest(API_PATHS.events, { token });
  return sortEventsByDate(parseCollection(data).map(normalizeEvent));
}

export async function fetchEvent(token, id) {
  const data = await apiRequest(`${API_PATHS.events}/${id}`, { token });
  return normalizeEvent(data);
}

export async function createEvent(token, payload) {
  const data = await apiRequest(API_PATHS.events, {
    method: 'POST',
    token,
    body: payload,
  });
  return normalizeEvent(data);
}

export async function updateEvent(token, id, payload) {
  const data = await apiRequest(`${API_PATHS.events}/${id}`, {
    method: 'PUT',
    token,
    body: payload,
  });
  return normalizeEvent(data);
}

export async function deleteEvent(token, id) {
  return apiRequest(`${API_PATHS.events}/${id}`, {
    method: 'DELETE',
    token,
  });
}
