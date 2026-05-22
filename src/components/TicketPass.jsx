import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import theme from '../utils/theme';
import { getTicketQrValue } from '../utils/ticketQr';

const formatDateTime = value => {
  if (!value) {
    return 'TBD';
  }
  return new Date(value).toLocaleString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const TicketPass = ({ ticket, holderEmail }) => {
  const event = ticket?.event || {};
  const dateTime = formatDateTime(event.eventDate);
  const category = event.seatType || ticket.seatLabel || 'Event';
  const qrValue = getTicketQrValue(ticket);
  const holder =
    ticket.holderName || holderEmail?.split('@')[0] || 'Valued guest';

  return (
    <View style={styles.pass}>
      <View style={styles.hero}>
        <Text style={styles.heroCategory}>{category}</Text>
        <Text style={styles.heroTitle} numberOfLines={2}>
          {event.title || 'Comodo Event'}
        </Text>
      </View>

      <View style={styles.perforation}>
        <View style={styles.notchLeft} />
        <View style={styles.dashedLine} />
        <View style={styles.notchRight} />
      </View>

      <View style={styles.body}>
        <Text style={styles.confirmedLabel}>Ticket confirmed</Text>
        <Text style={styles.eventTitle}>{event.title || 'Event'}</Text>

        <View style={styles.holderBlock}>
          <View style={styles.holderRow}>
            <Text style={styles.gridLabel}>Ticket #</Text>
            <Text style={styles.gridValue}>{String(ticket.id)}</Text>
          </View>
          <View style={styles.holderRow}>
            <Text style={styles.gridLabel}>Name</Text>
            <Text style={styles.gridValue}>{holder}</Text>
          </View>
          <View style={styles.holderRow}>
            <Text style={styles.gridLabel}>Date & Time</Text>
            <Text style={styles.gridValue}>{dateTime}</Text>
          </View>
          <View style={styles.holderRow}>
            <Text style={styles.gridLabel}>Location</Text>
            <Text style={styles.gridValue}>{event.location || 'TBD'}</Text>
          </View>
          <View style={styles.holderRow}>
            <Text style={styles.gridLabel}>Price</Text>
            <Text style={styles.gridValue}>
              ₱{Number(ticket.price || event.price || 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.holderRow}>
            <Text style={styles.gridLabel}>Seat</Text>
            <Text style={styles.gridValue}>
              {ticket.seatLabel || event.seatType || 'General admission'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.perforation}>
        <View style={styles.notchLeft} />
        <View style={styles.dashedLine} />
        <View style={styles.notchRight} />
      </View>

      <View style={styles.qrSection}>
        {qrValue ? (
          <QRCode
            value={qrValue}
            size={168}
            backgroundColor="#FFFFFF"
            color="#222221"
          />
        ) : (
          <Text style={styles.qrMissing}>
            QR code will appear after the ticket is saved on the server.
          </Text>
        )}
        <Text style={styles.qrHint}>
          Scan to verify your ticket at the event entrance.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pass: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
  },
  hero: {
    backgroundColor: theme.colors.tuatara,
    padding: theme.spacing.lg,
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  heroCategory: {
    color: theme.colors.butterscotch,
    fontSize: theme.fontSize.small,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  heroTitle: {
    color: theme.colors.timberwolf,
    fontSize: theme.fontSize.heading,
    fontWeight: '700',
  },
  perforation: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cream,
    height: 22,
  },
  notchLeft: {
    width: 14,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.tuatara,
    marginLeft: -7,
  },
  dashedLine: {
    flex: 1,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.borderLight,
    marginHorizontal: theme.spacing.sm,
  },
  notchRight: {
    width: 14,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.tuatara,
    marginRight: -7,
  },
  body: {
    padding: theme.spacing.lg,
  },
  confirmedLabel: {
    color: theme.colors.butterscotch,
    fontWeight: '600',
    fontSize: theme.fontSize.small,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
  },
  eventTitle: {
    fontSize: theme.fontSize.heading,
    fontWeight: '700',
    color: theme.colors.tuatara,
    marginBottom: theme.spacing.md,
  },
  gridLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.small,
    marginBottom: 2,
  },
  gridValue: {
    color: theme.colors.tuatara,
    fontWeight: '600',
    fontSize: theme.fontSize.body,
  },
  holderBlock: {
    gap: theme.spacing.sm,
  },
  holderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  qrSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: '#FFFFFF',
  },
  qrHint: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.small,
  },
  qrMissing: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.fontSize.small,
  },
});

export default TicketPass;
