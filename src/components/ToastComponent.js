import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

import Colors from '../constants/colors';
import images from '../constants/images';

const ToastBase = ({style, subtitle}) => (
  <View style={[styles.toast, style]}>
    <View
      style={[styles.leftBorder, {backgroundColor: style.leftBorderColor}]}
    />
    <View style={styles.content}>
      <Image source={images.Branding} style={styles.branding} />
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const SuccessToast = ({text1}) => (
  <ToastBase style={styles.successToast} title="Success" subtitle={text1} />
);

const ErrorToast = ({text1}) => (
  <ToastBase style={styles.infoToast} title="Error" subtitle={text1} />
);

const WarningToast = ({text1}) => (
  <ToastBase style={styles.warningToast} title="Warning" subtitle={text1} />
);

const ToastComponent = () => {
  const toastConfig = {
    success: SuccessToast,
    error: ErrorToast,
    warning: WarningToast,
  };

  return <Toast config={toastConfig} visibilityTime={3000} />;
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 4,
    backgroundColor: Colors.pureWhite,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  branding: {
    width: 25,
    height: 25,
    marginRight: 12,
    resizeMode: 'contain',
  },
  leftBorder: {
    width: 5,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  content: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.black,
  },
  successToast: {
    backgroundColor: '#F5F5F5',
    leftBorderColor: '#4CAF50',
  },
  infoToast: {
    backgroundColor: '#F5F5F5',
    leftBorderColor: '#e72324',
  },
  warningToast: {
    backgroundColor: '#F5F5F5',
    leftBorderColor: '#FFC107',
  },
});

export default ToastComponent;
