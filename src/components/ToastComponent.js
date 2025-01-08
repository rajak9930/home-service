import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/AntDesign';
import IconThree from 'react-native-vector-icons/Octicons';

import Colors from '../constants/colors';
import {useCustomTheme} from '../theme/Theme';

const SuccessToast = ({text1}) => (
  <View style={[styles.toast, styles.infoToast]}>
    <View style={styles.iconContainer}>
      <IconThree name="issue-closed" size={24} color="#46d061" />
    </View>
    <Text style={styles.toastText}>{text1}</Text>
  </View>
);

const WarningToast = ({text1}) => (
  <View style={[styles.toast, styles.warningToast]}>
    <View style={styles.iconContainer}>
      <IconTwo name="exclamationcircleo" size={20} color="#c8741c" />
    </View>
    <Text style={styles.toastText}>{text1}</Text>
  </View>
);

const ErrorToast = ({text1}) => (
  <View style={[styles.toast, styles.errorToast]}>
    <View style={styles.iconContainer}>
      <Icon name="warning-outline" size={24} color="#e72324" />
    </View>
    <Text style={styles.toastText}>{text1}</Text>
  </View>
);

const ToastComponent = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  const toastConfig = {
    success: SuccessToast,
    warning: WarningToast,
    error: ErrorToast,
  };

  return <Toast config={toastConfig} visibilityTime={2500} />;
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
  infoToast: {
    backgroundColor: '#f0f9f4',
  },
  warningToast: {
    backgroundColor: '#feeedb',
  },
  errorToast: {
    backgroundColor: '#fce5e6',
  },
  iconContainer: {
    marginRight: 12,
  },
  toastText: {
    fontSize: 15,
    color: Colors.black,
    flex: 1,
  },
});

export default ToastComponent;
