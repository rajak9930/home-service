import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import {setLanguage} from '../../redux/language/languageSlice';

const AppLanguage = () => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const theme = useCustomTheme();

  const isDarkMode = theme === 'dark';

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = async language => {
    setSelectedLanguage(language);

    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';

    await AsyncStorage.setItem('language', newLanguage);
    dispatch(setLanguage(newLanguage));
    await i18n.changeLanguage(newLanguage);

    navigation.replace('Onboarding');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.primaryDark : Colors.primary,
        },
      ]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <Text style={styles.title}>Select Your Language</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'en' && styles.selectedButton,
          ]}
          onPress={() => handleLanguageSelect('en')}>
          <View style={styles.buttonContent}>
            <Text style={styles.flagText}>🇺🇸</Text>
            <Text
              style={[
                styles.buttonText,
                selectedLanguage === 'en' && styles.selectedButtonText,
              ]}>
              English
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'ar' && styles.selectedButton,
          ]}
          onPress={() => handleLanguageSelect('ar')}>
          <View style={styles.buttonContent}>
            <Text style={styles.flagText}>🇸🇦</Text>
            <Text
              style={[
                styles.buttonText,
                selectedLanguage === 'ar' && styles.selectedButtonText,
              ]}>
              العربية
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 20,
  },
  languageButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedButton: {
    backgroundColor: Colors.secondary,
  },

  selectedButtonText: {
    color: '#fff',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flagText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default AppLanguage;
