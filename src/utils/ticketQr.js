/**
 * QR payload aligned with Comodo-booking OrderController / TicketQrService
 * (JSON stored in ticket.qr_code_path on the web app).
 */
export const buildWebAlignedQrPayload = ticket => {
  const event = ticket?.event || {};
  return JSON.stringify({
    ticketId: ticket.id,
    eventId: event.id,
    customerId: ticket.customerId,
    price: ticket.price,
    status: ticket.status,
    purchaseDate: ticket.purchaseDate,
    issuedAt: new Date().toISOString(),
  });
};

export const getTicketQrValue = ticket => {
  if (ticket?.qrCodePath) {
    return ticket.qrCodePath;
  }
  if (ticket?.id && ticket?.event) {
    return buildWebAlignedQrPayload(ticket);
  }
  return '';
};
