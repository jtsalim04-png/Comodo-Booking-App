import { Image, StyleSheet, Text, View } from 'react-native';

import ScreenBackground from '../components/ScreenBackground';
import { IMG } from '../utils';
import theme from '../utils/theme';

const ProfileScreen = () => {
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={IMG.LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.body}>
            Profile details and ticket history will appear here — matching the
            Comodo Booking web experience.
          </Text>
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
  card: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.butterscotch,
    alignItems: 'center',
    shadowColor: theme.colors.tuatara,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  logo: {
    width: 260,
    height: 80,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.heading,
    fontWeight: '600',
    color: theme.colors.tuatara,
    marginBottom: theme.spacing.md,
  },
  body: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ProfileScreen;
