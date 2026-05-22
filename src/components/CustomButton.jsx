import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../utils/theme';

const variants = {
  primary: {
    backgroundColor: theme.colors.butterscotch,
    textColor: theme.colors.timberwolf,
    borderColor: theme.colors.butterscotch,
  },
  secondary: {
    backgroundColor: theme.colors.tuatara,
    textColor: theme.colors.timberwolf,
    borderColor: theme.colors.tuatara,
  },
  ghost: {
    backgroundColor: 'transparent',
    textColor: theme.colors.tuatara,
    borderColor: theme.colors.borderMuted,
  },
  danger: {
    backgroundColor: theme.colors.danger,
    textColor: '#FFFFFF',
    borderColor: theme.colors.danger,
  },
};

const CustomButton = ({
  containerStyle,
  textStyle,
  label,
  onPress,
  variant = 'primary',
}) => {
  const palette = variants[variant] || variants.primary;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[
          styles.button,
          {
            backgroundColor: palette.backgroundColor,
            borderColor: palette.borderColor,
          },
        ]}>
        <Text style={[styles.label, { color: palette.textColor }, textStyle]}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
  },
  label: {
    fontSize: theme.fontSize.button,
    fontWeight: '600',
  },
});

export default CustomButton;
