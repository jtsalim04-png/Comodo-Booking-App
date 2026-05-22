import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';
import theme from '../utils/theme';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminEventsScreen from '../screens/admin/AdminEventsScreen';
import AdminEventFormScreen from '../screens/admin/AdminEventFormScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: theme.colors.tuatara },
  headerTintColor: theme.colors.timberwolf,
  headerTitleStyle: { fontWeight: '600' },
};

const AdminNavigation = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.ADMIN_DASHBOARD}
    screenOptions={screenOptions}>
    <Stack.Screen
      name={ROUTES.ADMIN_DASHBOARD}
      component={AdminDashboardScreen}
      options={{ title: 'Admin' }}
    />
    <Stack.Screen
      name={ROUTES.ADMIN_EVENTS}
      component={AdminEventsScreen}
      options={{ title: 'Events' }}
    />
    <Stack.Screen
      name={ROUTES.ADMIN_EVENT_FORM}
      component={AdminEventFormScreen}
      options={({ route }) => ({
        title: route.params?.mode === 'edit' ? 'Edit event' : 'New event',
      })}
    />
    <Stack.Screen
      name={ROUTES.ADMIN_USERS}
      component={AdminUsersScreen}
      options={{ title: 'Users' }}
    />
    <Stack.Screen
      name={ROUTES.USER_PROFILE}
      component={UserProfileScreen}
      options={{ title: 'Account' }}
    />
  </Stack.Navigator>
);

export default AdminNavigation;
