import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import useDirection from '../../../hooks/useDirection';

const TopBar = () => {
  const theme = useCustomTheme();
  const navigation = useNavigation();
  const isDarkMode = theme === 'dark';
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  const themedStyles = getThemedStyles(isDarkMode);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <View
      style={[
        styles.header,
        themedStyles.headerBackground,
        {
          borderBottomColor: isDarkMode ? 'transparent' : '#eee',
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
      ]}>
      <View
        style={[
          styles.leftSection,
          {flexDirection: isRTL ? 'row-reverse' : 'row'},
        ]}>
        <TouchableOpacity
          onPress={handleDrawerOpen}
          style={styles.menuButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="menu" size={24} color={themedStyles.iconColor} />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Text style={[styles.locationLabel, themedStyles.textSecondary]}>
            {t('topBar.currentLocation')}
          </Text>
          <View style={styles.addressContainer}>
            <Text style={[styles.addressText, themedStyles.textPrimary]}>
              {t('topBar.street')}
            </Text>
            <Icon
              name="keyboard-arrow-down"
              size={24}
              color={themedStyles.iconColor}
            />
          </View>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        <View>
          <Text style={styles.bronzeText}>{t('topBar.bronze')}</Text>
          <Text style={[styles.pointsText, themedStyles.textSecondary]}>
            0 {t('topBar.points')}
          </Text>
        </View>
        <View style={styles.medalIcon}>
          <Image source={images.Badge} style={styles.badge} />
        </View>
      </View>
    </View>
  );
};

const getThemedStyles = isDarkMode => ({
  headerBackground: {
    backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
  },
  textPrimary: {
    color: isDarkMode ? Colors.pureWhite : Colors.black,
  },
  textSecondary: {
    color: isDarkMode ? Colors.darkLightGray : Colors.black,
  },
  iconColor: isDarkMode ? Colors.pureWhite : Colors.primaryDark,
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  menuButton: {
    padding: 8,
    marginLeft: -8, // To offset the padding and align with the container
  },
  locationContainer: {
    marginLeft: 8,
  },
  locationLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  pointsContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
  },
  bronzeText: {
    fontSize: 14,
    color: '#F4BF4B',
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#636A75',
  },
  badge: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default TopBar;
