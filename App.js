import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import AppNavigator from './src/routes/AppNavigator';
import {persistor, store} from './src/redux/store';
import ToastComponent from './src/components/ToastComponent';

// Ignore specific warnings
LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
      <ToastComponent />
    </Provider>
  );
};

export default App;
