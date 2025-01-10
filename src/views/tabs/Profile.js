import {WEB_CLIENT_ID} from '@env';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {supabase} from '../../supabase/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import Toast from 'react-native-toast-message';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useCustomTheme();

  const userDetails = useTypedSelector(selectedUser);
  const isDarkMode = theme === 'dark';

  const [isLoading, setIsLoading] = useState(false);

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
        text2: 'Failed to logout',
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
      <View style={styles.titleContainer}>
        <View style={styles.indicator} />
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          Profile
        </Text>
      </View>

      <View style={[styles.tabsHeader, isDarkMode && styles.darkCard]}>
        <View style={styles.tabContainer}>
          <View style={styles.profileSection}>
            <Image
              source={{uri: userDetails?.user?.user_metadata?.picture}}
              style={styles.profileImage}
            />
            <View>
              <Text style={[styles.name, isDarkMode && styles.darkText]}>
                {userDetails?.user?.user_metadata?.full_name}
              </Text>
              <Text style={[styles.username, isDarkMode && styles.darkSubText]}>
                @
                {userDetails?.user?.user_metadata?.name
                  ?.toLowerCase()
                  .replace(/\s/g, '')}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.detailsContainer, isDarkMode && styles.darkCard]}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>
            Phone Number
          </Text>
          <View
            style={[styles.detailValue, isDarkMode && styles.darkDetailValue]}>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
              +92 {userDetails?.user?.phone || '313 4866442'}
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>
            E-mail
          </Text>
          <View
            style={[styles.detailValue, isDarkMode && styles.darkDetailValue]}>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
              {userDetails?.user?.email}
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, isDarkMode && styles.darkText]}>
            Gender
          </Text>
          <View
            style={[styles.detailValue, isDarkMode && styles.darkDetailValue]}>
            <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
              Male
            </Text>
          </View>
        </View>
      </View>

      {/* Fixed Logout Button */}
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
          style={styles.logoutButton}
          onPress={handleSignOut}
          disabled={isLoading}>
          {!isLoading && (
            <Icon name="log-out-outline" size={24} color="#FF4B55" />
          )}
          {isLoading ? (
            <ActivityIndicator color="#FF4B55" />
          ) : (
            <Text style={styles.logoutText}>Logout</Text>
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
    marginRight: 8,
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
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  username: {
    fontSize: 16,
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
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 15,
    color: Colors.black,
    marginBottom: 8,
  },
  detailValue: {
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkDetailValue: {
    backgroundColor: Colors.primaryDark,
  },
  detailText: {
    fontSize: 16,
    color: Colors.black,
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
});

export default Profile;
