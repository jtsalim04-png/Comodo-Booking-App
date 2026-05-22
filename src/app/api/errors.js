/** Symfony 404 when a controller route is missing on the API server. */
export const isRouteNotFoundError = error => {
  if (error?.status !== 404) {
    return false;
  }
  const text = [
    error?.message,
    error?.data?.detail,
    error?.data?.message,
    error?.data?.title,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return text.includes('no route found') || text.includes('not found');
};

export const ROUTE_NOT_FOUND_HINT =
  'Ticket routes are missing on your website server. Keep symfony server running for ComodoWebsite on port 8000, then run: php bin/console cache:clear in that project folder. The app uses the same /api/tickets endpoints as the website JSON API.';
