import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';

const AppLanguage = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = async language => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem('language', language);

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
      <Text style={styles.title}>Select Your Language</Text>
      <Text style={styles.titleArabic}>اختر لغتك</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'en' && styles.selectedButton,
          ]}
          onPress={() => handleLanguageSelect('en')}>
          <Text
            style={[
              styles.buttonText,
              selectedLanguage === 'en' && styles.selectedButtonText,
            ]}>
            English
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'ar' && styles.selectedButton,
          ]}
          onPress={() => handleLanguageSelect('ar')}>
          <Text
            style={[
              styles.buttonText,
              selectedLanguage === 'ar' && styles.selectedButtonText,
            ]}>
            العربية
          </Text>
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
    marginBottom: 10,
  },
  titleArabic: {
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
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default AppLanguage;
