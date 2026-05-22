let unauthorizedHandler = null;

export const setUnauthorizedHandler = handler => {
  unauthorizedHandler = handler;
};

export const clearUnauthorizedHandler = () => {
  unauthorizedHandler = null;
};

export const notifySessionExpired = (message = 'Your session has expired. Please sign in again.') => {
  unauthorizedHandler?.(message);
};
