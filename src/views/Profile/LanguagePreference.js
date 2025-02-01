import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useCustomTheme} from '../../theme/Theme';
import useDirection from '../../hooks/useDirection';
import Colors from '../../constants/colors';

const LanguagePreference = ({
  selectedLanguage,
  handleLanguageChange,
  isLanguageChanging,
}) => {
  const theme = useCustomTheme();
  const {isRTL} = useDirection();

  const isDarkMode = theme === 'dark';
  return (
    <>
      <View
        style={[
          styles.languageOptions,
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        ]}>
        {/* English Option */}
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'en' && styles.selectedLanguage,
            isDarkMode && styles.darkDetailValue,
            {flexDirection: isRTL ? 'row-reverse' : 'row'},
          ]}
          onPress={() => handleLanguageChange('en')}
          disabled={isLanguageChanging}>
          <View style={styles.languageContent}>
            <Text
              style={[
                styles.languageText,
                selectedLanguage === 'en' && styles.selectedLanguageText,
                isDarkMode && styles.darkText,
                isRTL && styles.rtlText,
              ]}>
              English
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={[
                  styles.languageSubtext,
                  isDarkMode && styles.darkSubText,
                  isRTL && styles.rtlText,
                ]}>
                English
              </Text>
              <Text style={styles.flagText}>🇺🇸</Text>
            </View>
          </View>
          {isLanguageChanging && selectedLanguage === 'en' ? (
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              style={[
                styles.checkmark,
                {
                  marginLeft: isRTL ? 0 : 'auto',
                  marginRight: isRTL ? 'auto' : 0,
                },
              ]}
            />
          ) : (
            selectedLanguage === 'en' && (
              <View
                style={[
                  styles.checkmark,
                  {
                    marginLeft: isRTL ? 0 : 'auto',
                    marginRight: isRTL ? 'auto' : 0,
                  },
                ]}>
                <Icon
                  name="checkmark-circle"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            )
          )}
        </TouchableOpacity>

        {/* Arabic Option */}
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'ar' && styles.selectedLanguage,
            isDarkMode && styles.darkDetailValue,
            {flexDirection: isRTL ? 'row-reverse' : 'row'},
          ]}
          onPress={() => handleLanguageChange('ar')}
          disabled={isLanguageChanging}>
          <View style={styles.languageContent}>
            <Text
              style={[
                styles.languageText,
                selectedLanguage === 'ar' && styles.selectedLanguageText,
                isDarkMode && styles.darkText,
                isRTL && styles.rtlText,
              ]}>
              العربية
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={[
                  styles.languageSubtext,
                  isDarkMode && styles.darkSubText,
                  isRTL && styles.rtlText,
                ]}>
                Arabic
              </Text>
              <Text style={styles.flagText}>🇸🇦</Text>
            </View>
          </View>
          {isLanguageChanging && selectedLanguage === 'ar' ? (
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              style={[
                styles.checkmark,
                {
                  marginLeft: isRTL ? 0 : 'auto',
                  marginRight: isRTL ? 'auto' : 0,
                },
              ]}
            />
          ) : (
            selectedLanguage === 'ar' && (
              <View
                style={[
                  styles.checkmark,
                  {
                    marginLeft: isRTL ? 0 : 'auto',
                    marginRight: isRTL ? 'auto' : 0,
                  },
                ]}>
                <Icon
                  name="checkmark-circle"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            )
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  languageOptions: {
    gap: 12,
    flexDirection: 'row',
    flex: 1,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    width: '48%',
    marginTop: 5,
  },
  selectedLanguage: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}15`,
  },

  languageContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 2,
  },
  languageSubtext: {
    fontSize: 12,
    color: Colors.lightGray,
  },
  selectedLanguageText: {
    color: Colors.primary,
  },
  checkmark: {
    marginLeft: 'auto',
  },
});

export default LanguagePreference;
