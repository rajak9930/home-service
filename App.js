import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {I18nextProvider} from 'react-i18next';

import AppNavigator from './src/routes/AppNavigator';
import {persistor, store} from './src/redux/store';
import ToastComponent from './src/components/ToastComponent';
import LanguageInitializer from './LanguageInitializer';
import i18n from './src/i18n';

// Ignore specific warnings
LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <LanguageInitializer>
            <AppNavigator />
          </LanguageInitializer>
        </I18nextProvider>
      </PersistGate>
      <ToastComponent />
    </Provider>
  );
};

export default App;
