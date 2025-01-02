import {WEB_CLIENT_ID} from '@env';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {supabase} from '../../supabase/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../../redux/auth/authSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useCustomTheme} from '../../theme/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignOut = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useCustomTheme();

  const [isLoading, setIsLoading] = React.useState(false);

  const backgroundColor = theme === 'dark' ? '#1a1a1a' : '#f5f5f5';
  const buttonBg = theme === 'dark' ? '#333' : '#e0e0e0';
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';

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
      Alert.alert('Error', 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <TouchableOpacity
        style={[styles.signOutButton, {backgroundColor: buttonBg}]}
        onPress={handleSignOut}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <>
            <Icon name="logout" size={24} color={textColor} />
            <Text style={[styles.buttonText, {color: textColor}]}>
              Sign Out
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignOut;
