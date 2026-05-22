import { Alert } from 'react-native';

import { ROUTE_NOT_FOUND_HINT } from '../app/api/errors';

/** Show API errors unless the session handler already logged the user out. */
export const showApiError = (error, fallback = 'Something went wrong') => {
  if (error?.isUnauthorized) {
    return;
  }
  if (error?.isRouteNotFound) {
    Alert.alert('API not available', ROUTE_NOT_FOUND_HINT);
    return;
  }
  Alert.alert('Error', error?.message || fallback);
};
