import {WEB_CLIENT_ID} from '@env';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import RNRestart from 'react-native-restart';

import {supabase} from '../../supabase/supabaseClient';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import useDirection from '../../hooks/useDirection';
import {setLanguage} from '../../redux/language/languageSlice';
import LanguagePreference from '../Profile/LanguagePreference';
import ProfileDetails from '../Profile/ProfileDetails';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const {t, i18n} = useTranslation();
  const {isRTL} = useDirection();

  const userDetails = useTypedSelector(selectedUser);
  const currentLanguage = i18n.language;
  const isDarkMode = theme === 'dark';

  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await GoogleSignin.configure({
          webClientId: WEB_CLIENT_ID,
          offlineAccess: true,
          scopes: ['profile', 'email'],
        });
      } catch (error) {
        console.error('Google Sign In configuration error:', error);
      }
    };

    configureGoogleSignIn();
  }, []);

  const handleLanguageChange = async language => {
    if (language === selectedLanguage) {
      return;
    }

    setIsLanguageChanging(true);
    try {
      setSelectedLanguage(language);
      await AsyncStorage.setItem('language', language);
      dispatch(setLanguage(language));
      await i18n.changeLanguage(language);

      // Add a small delay before restart for better UX
      RNRestart.restart();
      setTimeout(() => {}, 1000);
    } catch (error) {
      console.error('Error saving language preference:', error);

      // Revert selection on error
      setSelectedLanguage(currentLanguage);
      setIsLanguageChanging(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.signOut();
      await supabase.auth.signOut();
      await AsyncStorage.removeItem('user');
      dispatch(setUser(null));
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error signing out:', error);
      Toast.show({
        type: 'error',
        text2: t('profile.logout.failed'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <View
        style={[
          styles.titleContainer,
          {flexDirection: isRTL ? 'row-reverse' : 'row'},
        ]}>
        <View
          style={[
            styles.indicator,
            {marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0},
          ]}
        />
        <Text
          style={[
            styles.title,
            isDarkMode && styles.darkText,
            isRTL && styles.rtlText,
          ]}>
          {t('profile.title')}
        </Text>
      </View>

      <ScrollView
        style={styles.mainScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={[styles.tabsHeader, isDarkMode && styles.darkCard]}>
          <View
            style={[
              styles.profileSection,
              {flexDirection: isRTL ? 'row-reverse' : 'row'},
            ]}>
            <Image
              source={{uri: userDetails?.user?.user_metadata?.picture}}
              style={[
                styles.profileImage,
                {marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0},
              ]}
            />
            <View>
              <Text
                style={[
                  styles.name,
                  isDarkMode && styles.darkText,
                  isRTL && styles.rtlText,
                ]}>
                {userDetails?.user?.user_metadata?.full_name}
              </Text>
              <Text
                style={[
                  styles.username,
                  isDarkMode && styles.darkSubText,
                  isRTL && styles.rtlText,
                ]}>
                @
                {userDetails?.user?.user_metadata?.name
                  ?.toLowerCase()
                  .replace(/\s/g, '')}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.detailsContainer, isDarkMode && styles.darkCard]}>
          {/* ProfileDetails */}
          <ProfileDetails />
          {/* Language Preference Section */}
          <View style={styles.detailItem}>
            <Text
              style={[
                styles.detailLabel,
                isDarkMode && styles.darkText,
                isRTL && styles.rtlText,
              ]}>
              {t('profile.details.languagePreference')}
            </Text>

            <LanguagePreference
              selectedLanguage={selectedLanguage}
              handleLanguageChange={handleLanguageChange}
              isLanguageChanging={isLanguageChanging}
            />
          </View>
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View
        style={[
          styles.logoutContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.primaryDark
              : Colors.primaryLight,
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              gap: isRTL ? 8 : 0,
            },
          ]}
          onPress={handleSignOut}
          disabled={isLoading}>
          {!isLoading && (
            <Icon name="log-out-outline" size={24} color="#FF4B55" />
          )}
          {isLoading ? (
            <ActivityIndicator color="#FF4B55" />
          ) : (
            <Text
              style={[
                styles.logoutText,
                isRTL && styles.rtlText,
                {marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0},
              ]}>
              {t('profile.logout')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for logout button
  },
  lightContainer: {
    backgroundColor: Colors.primaryLight,
  },
  darkContainer: {
    backgroundColor: Colors.primaryDark,
  },
  darkCard: {
    backgroundColor: Colors.navBg,
  },
  darkText: {
    color: Colors.pureWhite,
  },
  darkSubText: {
    color: Colors.darkLightGray,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  tabsHeader: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.pureWhite,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  username: {
    fontSize: 13,
    color: Colors.lightGray,
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderRadius: 8,
    backgroundColor: Colors.pureWhite,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailItem: {
    marginBottom: 18,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.black,
    marginBottom: 8,
  },

  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFE5E7',
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF4B55',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  rtlText: {
    textAlign: 'right',
  },
});

export default Profile;
