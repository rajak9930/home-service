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
import {useTranslation} from 'react-i18next';
import useDirection from '../../hooks/useDirection';

const Home = () => {
  const theme = useCustomTheme();
  const userDetails = useTypedSelector(selectedUser);
  const name = userDetails?.user?.user_metadata?.name || '';
  const isDarkMode = theme === 'dark';
  const {t} = useTranslation();
  const {isRTL} = useDirection();

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
            <View
              style={[
                styles.greeting,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <Text
                style={[
                  styles.hello,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}>
                {t('topBar.hello')}, {name ? `${name}` : ''}
              </Text>
              <Image source={images.Hello} style={styles.helloIcon} />
            </View>
            <Text
              style={[
                styles.subtitle,
                isDarkMode ? styles.darkSubtitle : styles.lightSubtitle,
                {
                  textAlign: isRTL ? 'right' : 'left',
                  alignSelf: isRTL ? 'flex-end' : 'flex-start',
                },
              ]}>
              {t('topBar.title')}
            </Text>
            {/* Search Bar */}
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </View>

          {/* Slider */}
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
