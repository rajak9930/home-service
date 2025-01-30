import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {apiSlice} from './api/apiSlice';

import authReducer from './auth/authSlice';
import themeReducer from './theme/themeSlice';
import draftServiceReducer from './draftService/draftServiceSlice';
import bookedServiceReducer from './bookedService/bookedServiceSlice';
import languageReducer from './language/languageSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'theme', 'draftService', 'bookedService', 'language'], // Changed to persist auth state
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,

  theme: themeReducer,
  draftService: draftServiceReducer,
  bookedService: bookedServiceReducer,
  language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
