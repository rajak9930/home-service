import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useCustomTheme} from '../../theme/Theme';
import {useDispatch} from 'react-redux';
import {setTheme} from '../../redux/theme/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const dispatch = useDispatch();
  const theme = useCustomTheme();

  const backgroundColor = theme === 'dark' ? '#1a1a1a' : '#f5f5f5';
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';

  const changeTheme = () => {
    const themeType = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(themeType));
    AsyncStorage.setItem('theme', themeType);
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>Welcome Home</Text>

      <TouchableOpacity
        style={[
          styles.themeButton,
          {
            backgroundColor: theme === 'dark' ? '#333' : '#e0e0e0',
          },
        ]}
        onPress={changeTheme}>
        <Icon
          name={
            theme === 'dark' ? 'white-balance-sunny' : 'moon-waxing-crescent'
          }
          size={24}
          color={textColor}
        />
        <Text style={[styles.buttonText, {color: textColor}]}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Home;
