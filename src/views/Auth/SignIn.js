import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';

import images from '../../constants/images';
import Colors from '../../constants/colors';

const SignIn = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const googleButtonOpacity = useRef(new Animated.Value(0)).current;
  const googleButtonTranslateY = useRef(new Animated.Value(50)).current;
  const guestButtonOpacity = useRef(new Animated.Value(0)).current;
  const guestButtonTranslateY = useRef(new Animated.Value(50)).current;

  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  useEffect(() => {
    Animated.sequence([
      // Logo fade in
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Welcome text fade in
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Google button animation
      Animated.parallel([
        Animated.timing(googleButtonOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(googleButtonTranslateY, {
          toValue: 0,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Guest button animation
      Animated.parallel([
        Animated.timing(guestButtonOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(guestButtonTranslateY, {
          toValue: 0,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleSignIn = () => {};

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.primaryDark : Colors.pureWhite},
      ]}>
      <Animated.View style={[styles.contentContainer, {opacity: logoOpacity}]}>
        <Image
          source={isDarkMode ? images.logo : images.authLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.Text
        style={[
          styles.welcomeText,
          isDarkMode ? {color: Colors.white} : {color: '#333'},
          {opacity: welcomeOpacity},
        ]}>
        Welcome back! Glad to see you, Again
      </Animated.Text>

      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          opacity: googleButtonOpacity,
          transform: [{translateY: googleButtonTranslateY}],
        }}>
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          style={styles.googleButton}
          activeOpacity={0.8}>
          <View style={styles.googleButtonContent}>
            <Image
              source={images.googleLogo}
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          opacity: guestButtonOpacity,
          transform: [{translateY: guestButtonTranslateY}],
        }}>
        <TouchableOpacity style={styles.guest}>
          <Text
            style={[
              styles.guestText,
              isDarkMode ? {color: Colors.black} : {color: '#666'},
            ]}>
            Continue as guest
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pureWhite,
    paddingHorizontal: 20,
    gap: 30,
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  googleWrap: {
    width: '100%',
  },
  googleButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  guest: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
  },
  guestText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default SignIn;
