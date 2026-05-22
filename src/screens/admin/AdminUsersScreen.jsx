import { StyleSheet, Text, View } from 'react-native';

import ComodoCard from '../../components/ComodoCard';
import ScreenBackground from '../../components/ScreenBackground';
import theme from '../../utils/theme';

const AdminUsersScreen = () => {
  return (
    <ScreenBackground overlayColor="rgba(34, 34, 33, 0.55)">
      <View style={styles.container}>
        <ComodoCard>
          <Text style={styles.title}>User management</Text>
          <Text style={styles.body}>
            Full user CRUD (create, edit, toggle status, reset password) is
            available on the Comodo Booking web admin panel.
          </Text>
          <Text style={styles.body}>
            The mobile admin app focuses on events and dashboard metrics via
            the API. User APIs can be added to Symfony when you are ready to
            sync this screen.
          </Text>
        </ComodoCard>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.heading,
    fontWeight: '600',
    color: theme.colors.tuatara,
    marginBottom: theme.spacing.md,
  },
  body: {
    fontSize: theme.fontSize.body,
    color: theme.colors.tuatara,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
});

export default AdminUsersScreen;
