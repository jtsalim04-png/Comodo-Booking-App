import { Platform } from 'react-native';

// For a physical Android device over USB, use adb reverse and localhost.
const LOCAL_API_HOST =
  Platform.OS === 'android' ? 'http://127.0.0.1:8000' : 'http://127.0.0.1:8000';

export const BASE_URL = LOCAL_API_HOST;
