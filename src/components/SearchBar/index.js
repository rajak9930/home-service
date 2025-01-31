import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import useDirection from '../../hooks/useDirection';

const SearchBar = ({placeholder, searchText, setSearchText}) => {
  const theme = useCustomTheme();
  const navigation = useNavigation();
  const isDarkMode = theme === 'dark';
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  return (
    <View
      style={[
        styles.searchContainer,
        isDarkMode ? styles.darkSearchContainer : styles.lightSearchContainer,
        isRTL && styles.rtlContainer,
      ]}>
      {placeholder && (
        <TouchableOpacity
          style={[styles.backButton, isRTL && styles.rtlBackButton]}
          onPress={() => navigation.goBack()}>
          <Icon
            name={isRTL ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color={isDarkMode ? Colors.pureWhite : '#333'}
          />
        </TouchableOpacity>
      )}
      <TextInput
        style={[
          styles.searchInput,
          isDarkMode ? styles.darkInput : styles.lightInput,
          isRTL && styles.rtlInput,
        ]}
        placeholder={placeholder ? placeholder : t('search')}
        placeholderTextColor={isDarkMode ? '#9B9E9F' : '#9CA3AF'}
        value={searchText}
        onChangeText={text => setSearchText(text)}
        textAlign={isRTL ? 'right' : 'left'}
        writingDirection={isRTL ? 'rtl' : 'ltr'}
      />
      <View style={[styles.searchIconContainer, isRTL && styles.rtlSearchIcon]}>
        <Icon name="search" size={24} color={Colors.pureWhite} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  rtlContainer: {
    flexDirection: 'row-reverse',
  },
  darkSearchContainer: {
    backgroundColor: Colors.navBg,
    borderColor: '#9B9E9F',
    borderWidth: 1,
  },
  lightSearchContainer: {
    backgroundColor: Colors.pureWhite,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  rtlInput: {
    textAlign: 'right',
  },
  darkInput: {
    color: Colors.pureWhite,
  },
  lightInput: {
    color: '#1F2937',
  },
  searchIconContainer: {
    padding: 6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginRight: 10,
  },
  rtlSearchIcon: {
    marginRight: 0,
    marginLeft: 10,
  },
  backButton: {
    marginLeft: 8,
  },
  rtlBackButton: {
    marginLeft: 0,
    marginRight: 8,
  },
});

export default SearchBar;
