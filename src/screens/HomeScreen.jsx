import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import ScreenBackground from '../components/ScreenBackground';
import { IMG, ROUTES } from '../utils';
import theme from '../utils/theme';
import { authLogout } from '../app/actions';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Image source={IMG.LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.heroTitle}>Comodo Booking</Text>
          <Text style={styles.heroText}>
            Discover events, reserve tickets, and manage your bookings in one
            place.
          </Text>
        </View>

        <View style={styles.actions}>
          <CustomButton
            label="Browse events"
            variant="primary"
            containerStyle={styles.actionButton}
            onPress={() => navigation.navigate(ROUTES.PROFILE)}
          />
          <CustomButton
            label="My profile"
            variant="ghost"
            containerStyle={styles.actionButton}
            onPress={() => navigation.navigate(ROUTES.PROFILE)}
          />
          <CustomButton
            label="Log out"
            variant="danger"
            containerStyle={styles.actionButton}
            onPress={() => dispatch(authLogout())}
          />
        </View>
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
  heroCard: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    shadowColor: theme.colors.tuatara,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    width: 280,
    height: 88,
    marginBottom: theme.spacing.md,
  },
  heroTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: '600',
    color: theme.colors.butterscotch,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  heroText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.tuatara,
    textAlign: 'center',
    lineHeight: 24,
  },
  actions: {
    gap: theme.spacing.sm,
  },
  actionButton: {
    width: '100%',
  },
});

export default HomeScreen;
