import { ImageBackground, StyleSheet, View } from 'react-native';
import { IMG } from '../utils';
import theme from '../utils/theme';

const ScreenBackground = ({
  children,
  source = IMG.TAROT_BG,
  overlayColor = theme.overlay.page,
}) => {
  return (
    <ImageBackground
      source={source}
      style={styles.background}
      resizeMode="cover">
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});

export default ScreenBackground;
