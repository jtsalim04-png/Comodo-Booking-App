import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ComodoCard from '../../components/ComodoCard';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import ScreenBackground from '../../components/ScreenBackground';
import { registerUser } from '../../app/api/auth';
import { IMG, ROUTES } from '../../utils';
import theme from '../../utils/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigation = useNavigation();

  const onRegister = async () => {
    const trimmedEmail = email.trim();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (!trimmedFirst || !trimmedLast) {
      Alert.alert('Missing fields', 'Please enter your first and last name.');
      return;
    }
    if (!trimmedEmail) {
      Alert.alert('Missing fields', 'Please enter your email address.');
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    if (!password) {
      Alert.alert('Missing fields', 'Please enter a password.');
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Weak password',
        'Password must be at least 6 characters long.',
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    if (!accepted) {
      Alert.alert(
        'Terms',
        'You must accept the terms and conditions to register.',
      );
      return;
    }

    setSubmitting(true);
    try {
      const data = await registerUser({
        email: trimmedEmail,
        password,
        firstName: trimmedFirst,
        lastName: trimmedLast,
      });

      Alert.alert(
        'Registration successful',
        data?.message ||
          'Please check your email to verify your account before signing in.',
        [{ text: 'OK', onPress: () => navigation.navigate(ROUTES.LOGIN) }],
      );
    } catch (error) {
      Alert.alert(
        'Registration failed',
        error.message || 'Could not create your account. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenBackground source={IMG.STAR_TAROT} overlayColor={theme.overlay.login}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <ComodoCard>
            <View style={styles.logoWrap}>
              <Image
                source={IMG.LOGO}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join Comodo Booking to reserve tickets and track your orders.
            </Text>

            <CustomTextInput
              label="First Name"
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <CustomTextInput
              label="Last Name"
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
            <CustomTextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <CustomTextInput
              label="Password"
              placeholder="At least 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <CustomTextInput
              label="Confirm password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.termsRow}>
              <TouchableOpacity
                onPress={() => setAccepted(!accepted)}
                style={[
                  styles.checkbox,
                  accepted && styles.checkboxChecked,
                ]}
                disabled={submitting}>
                {accepted ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : null}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I accept the Terms and Conditions
              </Text>
            </View>

            {submitting ? (
              <ActivityIndicator
                color={theme.colors.butterscotch}
                style={styles.loader}
              />
            ) : (
              <CustomButton
                label="Register"
                variant="primary"
                containerStyle={styles.buttonWrap}
                onPress={onRegister}
              />
            )}

            <TouchableOpacity
              style={styles.backLink}
              disabled={submitting}
              onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={styles.backLinkText}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </ComodoCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  logo: {
    width: 200,
    height: 64,
  },
  title: {
    fontSize: theme.fontSize.heading,
    fontWeight: '600',
    color: theme.colors.tuatara,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: theme.colors.borderLight,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.butterscotch,
    borderColor: theme.colors.butterscotch,
  },
  checkmark: {
    color: theme.colors.cream,
    fontSize: 14,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    color: theme.colors.tuatara,
    fontSize: theme.fontSize.small,
    fontWeight: '500',
  },
  loader: {
    marginBottom: theme.spacing.md,
  },
  buttonWrap: {
    marginBottom: theme.spacing.md,
  },
  backLink: {
    alignItems: 'center',
  },
  backLinkText: {
    color: theme.colors.butterscotch,
    fontWeight: '700',
    fontSize: theme.fontSize.body,
  },
});

export default Register;
