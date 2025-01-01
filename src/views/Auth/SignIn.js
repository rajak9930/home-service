import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import images from '../../constants/images';
import Colors from '../../constants/colors';

const SignIn = () => {
  const handleGoogleSignIn = () => {};
  return (
    <View style={styles.container}>
      <Image source={images.authLogo} />
      <Text>Welcome back! Glad to see you, Again</Text>

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

      <TouchableOpacity style={styles.guest}>
        <Text>Continue as guest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.pureWhite,
  },

  guest: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderRadius: 5,
  },
});
