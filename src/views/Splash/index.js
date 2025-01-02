import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import images from '../../constants/images';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';

const Splash = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const userData = await AsyncStorage.getItem('user');
    const parsedUser = userData ? JSON.parse(userData) : null;
    setTimeout(() => {
      navigation.replace(parsedUser ? 'Main' : 'Onboarding');
    }, 2000);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === 'dark' ? Colors.primaryDark : Colors.primary,
        },
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
