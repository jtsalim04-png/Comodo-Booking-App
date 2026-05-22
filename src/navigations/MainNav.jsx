import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';
import theme from '../utils/theme';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.tuatara,
  },
  headerTintColor: theme.colors.timberwolf,
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 18,
  },
};

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME} screenOptions={screenOptions}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: 'Comodo Booking' }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{ title: 'My Profile' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
