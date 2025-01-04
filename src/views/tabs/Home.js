import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import TopBar from '../Home/components/TopBar';
import SearchBar from '../../components/SearchBar';
import {useCustomTheme} from '../../theme/Theme';
import Colors from '../../constants/colors';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import images from '../../constants/images';

const Home = () => {
  const theme = useCustomTheme();
  const userDetails = useTypedSelector(selectedUser);
  const {name} = userDetails.user.user_metadata;

  const isDarkMode = theme === 'dark';

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDarkMode
            ? Colors.primaryDark
            : Colors.primaryLight,
        },
      ]}>
      {/* Top Bar */}
      <TopBar />

      {/* Greeting Section */}
      <View
        style={[
          styles.greetingContainer,
          {
            backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
          },
        ]}>
        <View style={styles.greeting}>
          <Text
            style={[
              styles.hello,
              {
                color: isDarkMode ? Colors.pureWhite : '#666C89',
              },
            ]}>
            {name ? `Hello, ${name}` : 'Hello'}
          </Text>
          <Image
            source={images.Hello}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={[
            styles.subtitle,
            {
              color: isDarkMode ? Colors.pureWhite : '#172B4D',
            },
          ]}>
          What you are looking for today
        </Text>
        <SearchBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  greetingContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
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
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 6,
  },
});

export default Home;
