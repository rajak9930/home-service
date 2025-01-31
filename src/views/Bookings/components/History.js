import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import Colors from '../../../constants/colors';
import {useCustomTheme} from '../../../theme/Theme';
import useDirection from '../../../hooks/useDirection';

const History = () => {
  const theme = useCustomTheme();
  const {t} = useTranslation();
  const {isRTL} = useDirection();
  const isDarkMode = theme === 'dark';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
          },
        ]}>
        <View style={styles.iconContainer}>
          <Icon name="time-outline" size={50} color={Colors.primary} />
        </View>
        <Text
          style={[
            styles.noHistoryText,
            isDarkMode && styles.darkText,
            isRTL && styles.rtlText,
          ]}>
          {t('history.empty.title')}
        </Text>
        <Text
          style={[
            styles.subText,
            isDarkMode && styles.darkSubText,
            isRTL && styles.rtlText,
          ]}>
          {t('history.empty.description1')}
        </Text>
        <Text
          style={[
            styles.subText,
            isDarkMode && styles.darkSubText,
            isRTL && styles.rtlText,
          ]}>
          {t('history.empty.description2')}
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
    backgroundColor: Colors.pureWhite,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    textAlign: 'center',
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
  rtlText: {
    writingDirection: 'rtl',
    textAlign: 'center',
  },
});

export default History;
