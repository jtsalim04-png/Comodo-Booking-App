import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import theme from '../utils/theme';

const formatDate = value => {
  if (!value) {
    return 'TBD';
  }
  const date = new Date(value);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const EventCard = ({ event, onPress, actionLabel = 'View details' }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Date & time</Text>
        <Text style={styles.value}>{formatDate(event.eventDate)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{event.location || 'TBD'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>
          ₱{Number(event.price || 0).toFixed(2)}
        </Text>
      </View>
      {onPress ? (
        <CustomButton
          label={actionLabel}
          variant="primary"
          containerStyle={styles.button}
          onPress={onPress}
        />
      ) : null}
    </View>
  );
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
  button: {
    marginTop: theme.spacing.sm,
  },
});

export default EventCard;
