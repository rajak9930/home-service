import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import TopBar from '../Home/components/TopBar';
import SearchBar from '../../components/SearchBar';
import {useCustomTheme} from '../../theme/Theme';
import Colors from '../../constants/colors';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import images from '../../constants/images';
import Slider from '../../components/Slider';
import Categories from '../Home/components/Categories';

const Home = () => {
  const theme = useCustomTheme();
  const userDetails = useTypedSelector(selectedUser);
  const {name} = userDetails.user.user_metadata;

  const isDarkMode = theme === 'dark';

  return (
    <View
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <TopBar />

      <View
        style={[
          styles.greetingContainer,
          isDarkMode ? styles.darkGreetingBg : styles.lightGreetingBg,
        ]}>
        <View style={styles.greeting}>
          <Text
            style={[
              styles.hello,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}>
            {name ? `Hello, ${name}` : 'Hello'}
          </Text>
          <Image source={images.Hello} style={styles.helloIcon} />
        </View>
        <Text
          style={[
            styles.subtitle,
            isDarkMode ? styles.darkSubtitle : styles.lightSubtitle,
          ]}>
          What you are looking for today
        </Text>
        <SearchBar />
      </View>

      <View
        style={[
          styles.offerContainer,
          isDarkMode ? styles.darkGreetingBg : styles.lightGreetingBg,
        ]}>
        <Slider />
      </View>

      {/* Categories */}
      <View
        style={[
          styles.greetingContainer,
          isDarkMode ? styles.darkGreetingBg : styles.lightGreetingBg,
        ]}>
        <Categories />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: Colors.primaryDark,
  },
  lightContainer: {
    backgroundColor: Colors.primaryLight,
  },
  greetingContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  offerContainer: {
    paddingVertical: 16,
    paddingLeft: 6,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  darkGreetingBg: {
    backgroundColor: Colors.navBg,
  },
  lightGreetingBg: {
    backgroundColor: Colors.pureWhite,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hello: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  darkText: {
    color: Colors.pureWhite,
  },
  lightText: {
    color: '#666C89',
  },
  helloIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 6,
  },
  darkSubtitle: {
    color: Colors.pureWhite,
  },
  lightSubtitle: {
    color: '#172B4D',
  },
});

export default Home;
