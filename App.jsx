import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';

enableScreens();

import AppNav from './src/navigations';

import rootSaga from './src/app/sagas';
import configureStore from './src/app/reducers';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor, runSaga } = configureStore();
runSaga(rootSaga);

const App = () => {
  console.log('App rendering started');
  return (
    <Provider store={store}>
      <PersistGate
        loading={<View style={{ flex: 1, backgroundColor: '#F2F2F7' }} />}
        persistor={persistor}>
        <AppNav />
      </PersistGate>
    </Provider>
  );
};

export default App;
