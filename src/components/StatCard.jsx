import { StyleSheet, Text, View } from 'react-native';
import theme from '../utils/theme';

const StatCard = ({ label, value, variant = 'primary' }) => {
  const backgroundColor =
    variant === 'dark' ? theme.colors.tuatara : theme.colors.butterscotch;
  const textColor = theme.colors.timberwolf;

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.butterscotchDark,
  },
  label: {
    fontSize: theme.fontSize.small,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default StatCard;
