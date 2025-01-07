import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/colors';
import {useCustomTheme} from '../../../theme/Theme';

const Draft = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <View style={styles.iconContainer}>
          <Icon name="document-text-outline" size={50} color={Colors.primary} />
        </View>
        <Text style={[styles.noDraftText, isDarkMode && styles.darkText]}>
          No Draft Services
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          You don't have any saved drafts yet.
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          Save a service booking as draft to see it here.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ECE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noDraftText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  darkText: {
    color: Colors.pureWhite,
  },
  darkSubText: {
    color: Colors.darkLightGray,
  },
});

export default Draft;
