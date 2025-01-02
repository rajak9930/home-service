import {WEB_CLIENT_ID} from '@env';
import {View, Text, Alert, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import useTypedSelector from '../hooks/useTypedSelector';
import {selectedUser, setUser} from '../redux/auth/authSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {supabase} from '../supabase/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetails = useTypedSelector(selectedUser);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await GoogleSignin.configure({
          webClientId: WEB_CLIENT_ID,
          offlineAccess: true,
          scopes: ['profile', 'email'],
        });
        // console.log('Google Sign In configured successfully');
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
    <View>
      <Text>Main</Text>

      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Main;
