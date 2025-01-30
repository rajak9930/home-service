import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setLanguage} from './src/redux/language/languageSlice';
import i18n from './src/i18n';

const LanguageInitializer = ({children}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        console.log('storedLanguage', storedLanguage);
        const initialLanguage = storedLanguage || 'en';

        // Update Redux state
        dispatch(setLanguage(initialLanguage));

        // Update i18n
        await i18n.changeLanguage(initialLanguage);

        setIsInitialized(true);
      } catch (error) {
        console.error('Language initialization error:', error);
        // Fallback to English in case of error
        dispatch(setLanguage('en'));
        await i18n.changeLanguage('en');
        setIsInitialized(true);
      }
    };

    initializeLanguage();
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageInitializer;
