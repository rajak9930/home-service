import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import TopBar from '../Home/components/TopBar';
import SearchBar from '../../components/SearchBar';
import {useCustomTheme} from '../../theme/Theme';
import Colors from '../../constants/colors';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import images from '../../constants/images';
import Slider from '../../components/Slider';
import Categories from '../Home/components/Categories';
import CleaningServices from '../Home/components/CleaningServices';
import ApplianceRepair from '../Home/components/ApplianceRepair';

const Home = () => {
  const theme = useCustomTheme();
  const userDetails = useTypedSelector(selectedUser);
  const name = userDetails?.user?.user_metadata?.name || '';
  const isDarkMode = theme === 'dark';

  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <View style={styles.mainContainer}>
        <TopBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerStyle={styles.scrollContent}>
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
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </View>

          <View
            style={[
              styles.offerContainer,
              isDarkMode ? styles.darkGreetingBg : styles.lightGreetingBg,
            ]}>
            <Slider />
          </View>

          <View
            style={[
              styles.greetingContainer,
              isDarkMode ? styles.darkGreetingBg : styles.lightGreetingBg,
            ]}>
            <Categories />
          </View>

          <View
            style={[
              styles.greetingContainer,
              isDarkMode ? styles.darkGreetingBg : styles.lightGreetingBg,
              styles.lastContainer,
            ]}>
            <CleaningServices />
          </View>

          <View
            style={[
              styles.greetingContainer,
              isDarkMode ? styles.darkGreetingBg : styles.lightGreetingBg,
            ]}>
            <ApplianceRepair />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
    width: '80%',
    marginBottom: 19,
  },
  darkSubtitle: {
    color: Colors.pureWhite,
  },
  lightSubtitle: {
    color: '#172B4D',
  },
  lastContainer: {
    marginBottom: 16,
  },
});

export default Home;
