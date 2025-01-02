import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '../../constants/images';
import Colors from '../../constants/colors';

const Splash = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const userData = await AsyncStorage.getItem('user');
    const parsedUser = userData ? JSON.parse(userData) : null;
    setTimeout(() => {
      navigation.replace(parsedUser ? 'Main' : 'SignIn');
    }, 2000);
  };

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.primaryDark : Colors.primary},
      ]}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 175,
    height: 175,
  },
});
