export const getRoles = authData => authData?.user?.roles || authData?.roles || [];

export const isAdmin = authData => {
  const roles = getRoles(authData);
  return roles.includes('ROLE_ADMIN');
};

export const isRegularUser = authData => {
  const roles = getRoles(authData);
  return roles.includes('ROLE_USER') && !roles.includes('ROLE_ADMIN');
};

export const getDisplayName = authData => {
  const user = authData?.user || {};
  if (user.firstName) {
    return user.firstName;
  }
  const email = user.email || '';
  return email.split('@')[0] || 'Guest';
};
