import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';
import theme from '../utils/theme';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.tuatara },
        headerTintColor: theme.colors.timberwolf,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
