import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/colors';
import {useCustomTheme} from '../../../theme/Theme';

const History = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container]}>
      <View style={styles.emptyContainer}>
        <View style={styles.iconContainer}>
          <Icon name="time-outline" size={50} color={Colors.primary} />
        </View>
        <Text style={[styles.noHistoryText, isDarkMode && styles.darkText]}>
          No Service History
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          You haven't used any services yet.
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          Book a service to see your history here.
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
  noHistoryText: {
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

export default History;
