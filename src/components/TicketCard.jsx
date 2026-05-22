import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../utils/theme';

const formatDate = value => {
  if (!value) {
    return 'TBD';
  }
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TicketCard = ({ ticket, onPress }) => {
  const event = ticket.event || ticket.eventData || {};
  const title =
    typeof event === 'object' && event?.title
      ? event.title
      : 'Event removed';

  const content = (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{formatDate(event?.eventDate)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{event?.location || 'TBD'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>
          ₱{Number(ticket.price || 0).toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, styles.status]}>
          {ticket.status
            ? ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)
            : '—'}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Purchased</Text>
        <Text style={styles.value}>{formatDate(ticket.purchaseDate)}</Text>
      </View>
      {onPress ? (
        <Text style={styles.tapHint}>Tap to view ticket & QR code →</Text>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.heading,
    fontWeight: '600',
    color: theme.colors.tuatara,
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.small,
  },
  value: {
    color: theme.colors.tuatara,
    fontWeight: '500',
    fontSize: theme.fontSize.small,
    flex: 1,
    textAlign: 'right',
  },
  status: {
    color: theme.colors.butterscotch,
    fontWeight: '600',
  },
  tapHint: {
    marginTop: theme.spacing.sm,
    color: theme.colors.butterscotch,
    fontWeight: '600',
    fontSize: theme.fontSize.small,
  },
});

export default TicketCard;
