import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, useColorScheme} from 'react-native';

import images from '../../constants/images';
import Colors from '../../constants/colors';

const Splash = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.primaryDark : Colors.pureWhite},
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
