import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';

const SearchBar = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View
      style={[
        styles.searchContainer,
        isDarkMode ? styles.darkSearchContainer : styles.lightSearchContainer,
      ]}>
      <TextInput
        style={[
          styles.searchInput,
          isDarkMode ? styles.darkInput : styles.lightInput,
        ]}
        placeholder="Search what you need..."
        placeholderTextColor={isDarkMode ? '#9B9E9F' : '#9CA3AF'}
      />
      <View style={styles.searchIconContainer}>
        <Icon name="search" size={24} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
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
});

export default SearchBar;
